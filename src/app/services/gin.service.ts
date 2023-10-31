import { Injectable } from '@angular/core';
import { DocumentData, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Gin } from '../models/Gin';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class GinService {

  private readonly ginPath = "/Gins";
  private readonly ginConverter = {
    toFirestore(gin: Gin): DocumentData {
      return { name: gin.name, brand: gin.brand, avgPoints: gin.avgPoints, country: gin.country, valueLiterPoint: gin.valueLiterPoint, valuePerLiter: gin.valuePerLiter, variant: gin.variant, vol: gin.vol, votes: gin.votes, img: gin.img, cl: gin.cl, price: gin.price}
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<Gin>, options: any): Gin {
      const data = snapshot.data(options)!;
      return data
    }
  }

  constructor(private dbService: DbService) {
  }

  public getGins(): Observable<Gin[]> {
    return this.dbService.getAll<Gin>(this.ginPath, this.ginConverter);
  }

  public getGin(id: string): Observable<Gin> {
    return this.dbService.getDoc<Gin>(`${this.ginPath}/${id}`, this.ginConverter);
  }

  public getTop10Gins(): Observable<Gin[]> {
    return this.dbService.getOrderByWithLimit(10, "avgPoints", "desc", this.ginPath, this.ginConverter);
  }

  public getTop3Gins(): Observable<Gin[]> {
    return this.dbService.getOrderByWithLimit(3, 'avgPoints', 'desc', this.ginPath, this.ginConverter);
  }

  public addGin(gin: Gin): void {
    this.dbService.add(gin, this.ginPath, this.ginConverter);
  }

  public updateGin(gin: Gin): Promise<void> {
    if(!gin.id) {
      return Promise.reject('Could not find gin id');
    }
    return this.dbService.update(gin, `${this.ginPath}/${gin.id}`, this.ginConverter);
  }
}

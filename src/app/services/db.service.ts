import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { DocumentData } from '@firebase/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Gin } from '../models/Gin';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly ginPath = "/Gins";

  constructor(private firestore: Firestore) { }

  public getGins(): Observable<Gin[]> {
    const ginConverter = {
      toFirestore(gin: Gin): DocumentData {
        return {name: gin.name, brand: gin.brand, avgPoints: gin.avgPoints, country: gin.country, valueLiterPoint: gin.valueLiterPoint, valuePerLiter: gin.valuePerLister, variant: gin.variant, vol: gin.vol, votes: gin.votes}
      },
      fromFirestore(snapshot: QueryDocumentSnapshot<Gin>, options: any): Gin {
        const data = snapshot.data(options)!;
        return data 
      }
    }
    const colRef = collection(this.firestore, `${this.ginPath}`).withConverter(ginConverter);
    if(colRef) {
      const data = collectionData<Gin>(colRef).pipe(
        traceUntilFirst('firestore')
      );
      return data;
    }
    return EMPTY
  }
}

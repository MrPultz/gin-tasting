import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore, limit, orderBy, query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { DocumentData } from '@firebase/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Gin } from '../models/Gin';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly ginPath = "/Gins";
  private readonly ginConverter = {
    toFirestore(gin: Gin): DocumentData {
      return {name: gin.name, brand: gin.brand, avgPoints: gin.avgPoints, country: gin.country, valueLiterPoint: gin.valueLiterPoint, valuePerLiter: gin.valuePerLiter, variant: gin.variant, vol: gin.vol, votes: gin.votes}
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<Gin>, options: any): Gin {
      const data = snapshot.data(options)!;
      return data 
    }
  }

  constructor(private firestore: Firestore) { }

  public getGins(): Observable<Gin[]> {
    const colRef = collection(this.firestore, `${this.ginPath}`).withConverter(this.ginConverter);
    if(colRef) {
      const data = collectionData<Gin>(colRef).pipe(
        traceUntilFirst('firestore')
      );
      return data;
    }
    return EMPTY
  }

  public getTop10Gins(): Observable<Gin[]> {
    const colRef = collection(this.firestore, `${this.ginPath}`).withConverter(this.ginConverter);
    const q = query(colRef, orderBy("avgPoints", "desc"), limit(10));
    if(colRef) {
      const data = collectionData<Gin>(q).pipe(
        traceUntilFirst('firestore')
      );
      return data;
    }
    return EMPTY
  }
}

import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, limit, orderBy, query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { DocumentData } from '@firebase/firestore';
import { EMPTY, Observable } from 'rxjs';
import { Gin } from '../models/Gin';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly ginPath = "/Gins";
  private readonly ginConverter = {
    toFirestore(gin: Gin): DocumentData {
      return {name: gin.name, brand: gin.brand, avgPoints: gin.avgPoints, country: gin.country, valueLiterPoint: gin.valueLiterPoint, valuePerLiter: gin.valuePerLiter, variant: gin.variant, vol: gin.vol, votes: gin.votes, img: gin.img}
    },
    fromFirestore(snapshot: QueryDocumentSnapshot<Gin>, options: any): Gin {
      const data = snapshot.data(options)!;
      return data 
    }
  }
  private readonly colRef = collection(this.firestore, `${this.ginPath}`).withConverter(this.ginConverter);

  constructor(private firestore: Firestore) { }

  public getGins(): Observable<Gin[]> {
    if(this.colRef) {
      const data = collectionData<Gin>(this.colRef).pipe(
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

  public getUser(userId: string): Observable<User> {
    const userConverter = {
      toFirestore(user: User): DocumentData {
        return {name: user.name, email: user.email, isAdmin: user.isAdmin}
      },
      fromFirestore(snapshot: QueryDocumentSnapshot<User>, options: any): User {
        const data = snapshot.data(options)!;
        return data 
      }
    }
    const docRef = doc(this.firestore, `users/${userId}`).withConverter(userConverter);
    return docData(docRef);
  }

  public addGin(gin: Gin): void {
    if(this.colRef)
      addDoc(this.colRef, gin);
  }
}

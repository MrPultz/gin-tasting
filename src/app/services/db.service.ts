import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, FirestoreDataConverter, limit, orderBy, query, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { CollectionReference, DocumentData, OrderByDirection, SnapshotOptions } from '@firebase/firestore';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private _path: string = "";
  private _converter:FirestoreDataConverter<any> = {
    toFirestore: function (modelObject: any): DocumentData {
      throw new Error('Function not implemented.');
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions | undefined) {
      throw new Error('Function not implemented.');
    }
  }

  constructor(private firestore: Firestore) { }

  public getAll<T>(path: string, converter: FirestoreDataConverter<T>): Observable<T[]> {
    const colRef = collection(this.firestore, path).withConverter(converter);
    if(colRef == null) {
      return EMPTY;
    }

    const data = collectionData<T>(colRef).pipe(
      traceUntilFirst('firestore')
    );
    return data;
  }

  public getDoc<T>(path: string, converter: FirestoreDataConverter<T>): Observable<T> {
    const docRef = doc(this.firestore, path).withConverter(converter);
    return docData(docRef);
  }

  public getOrderByWithLimit<T>(limitNumber: number, field: string, directionStr: OrderByDirection, path: string, converter: FirestoreDataConverter<T>): Observable<T[]> {
    const colRef = collection(this.firestore, path).withConverter(converter);
    if(limitNumber < 1) {
      limitNumber = 1;
    }

    if(colRef == null) {
      return EMPTY;
    }
    const q = query(colRef, orderBy(field, directionStr), limit(limitNumber));
    const data = collectionData<T>(q).pipe(
      traceUntilFirst('firestore')
    );
    return data;
  }

  public add<T>(value: any, path: string, converter: FirestoreDataConverter<T>): void {
    const colRef = this.getColRef(path, converter);
    if(colRef)
      addDoc(colRef, value);
  }

  private getColRef<T>(path: string, converter: FirestoreDataConverter<T>): CollectionReference<T> {
    return collection(this.firestore, path).withConverter(converter);
  }
}

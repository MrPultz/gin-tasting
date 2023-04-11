import { Injectable } from '@angular/core';
import { getStorage, ref, StorageReference, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly ginPath = 'gins'
  private readonly storage = getStorage();

  constructor() { }

  updateImg(file: File): Promise<StorageReference> {
    const storageRef = ref(this.storage, `${this.ginPath}/${file.name}`);
    return new Promise((resolve, reject) => {
      uploadBytes(storageRef, file).then((snapshot) => {
        resolve(snapshot.ref);
      }).catch(err => {
        reject(err);
      });
    })
  }
}

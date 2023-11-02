import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  public asc<T>(array: T[], attr: keyof T, isNumber: boolean): void {
    if(isNumber) {
      array.sort((a,b) => b[attr] < a[attr] ? - 1 : 1);
    } else {
      array.sort((a,b) => b[attr] > a[attr] ? - 1 : 1);
    }
  }

  public desc<T>(array:T[], attr: keyof T, isNumber: boolean): void {
    if(isNumber) {
      array.sort((a,b) => b[attr] > a[attr] ? - 1 : 1);
    } else {
      array.sort((a,b) => b[attr] < a[attr] ? - 1 : 1);
    }
  }
}

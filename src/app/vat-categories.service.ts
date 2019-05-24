import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    // REPLACE the next line with the necessary code
    switch(category){
      case 0: 
      return 20;
      case 1: 
      return 10;
    }
    return NaN;
  }
}

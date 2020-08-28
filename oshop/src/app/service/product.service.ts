import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { 

  }

  save(product) {
    return this.db.list('/products').push(product)
    .then(() => console.log('Product saved'));
  }
}

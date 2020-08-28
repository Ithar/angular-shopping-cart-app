import { Product } from './../model/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { 

  }

  list() {
    return this.db.list('/products').snapshotChanges().pipe(
      map( actions => {
        return actions.map(a => {
          const data = a.payload.val() as Product; 
          const id = a.payload.key;
          return {
            id,
            data
          }
        })
      })
    ); 
  }

  save(product) {
    return this.db.list('/products').push(product)
    .then(() => console.log('Product saved to DB'));
  }
}

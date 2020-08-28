import { Product } from './../model/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { 

  }

  get(productId): Observable<any> {
    console.log('DB: getting:' + productId);
    return this.db.object('/products/' + productId).valueChanges().pipe(take(1));
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
    .then(() => console.log('DB: saved'));
  }

  update(productId, product) {
    return this.db.list('/products').update(productId, product)
    .then(() => console.log('DB: updated:' + productId));
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove()
    .then(() => console.log('DB: Deleted' + productId));
  }
  
}

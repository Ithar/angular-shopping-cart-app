import { Product } from '../model/product';
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
          const product = a.payload.val() as Product; 
          product.id = a.payload.key;; 
          return product;
        })
      })
    ); 
  }

  save(product: Product) {
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

  getById(id: string, products: Product[]): Product {
    return  products.filter(p => p.id.includes(id))[0];
  }

  filterByTitle(title: string, products: Product[]) {

    if (title) {
      return  products.filter(p => 
        p.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()))
    } else {
      return products; 
    }
  }
  
  filterByCategory(category: string, products: Product[]) {

    if (category) {
      return  products.filter(p => 
        p.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()))
    } else {
      return products; 
    }
  }

}

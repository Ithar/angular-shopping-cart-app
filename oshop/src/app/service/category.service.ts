import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 

  }

  getCategories() {
    return this.db.list('/categories').valueChanges();
  }

  // getCategories() {
  //   return this.db.list('/categories')
  //     .snapshotChanges()
  //     .pipe(
  //       map(category => {
  //         return category.map( c => ({
  //           $key : c.payload.key,
  //           name : c.payload.child.toString
  //         }))
  //       })
  //     );
  // }

}

import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {

    this.db.object('users/' + user.uid).update({
      email: user.email,
      name: user.displayName,
      admin: false
    })
  }
}

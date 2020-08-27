import { AppUser } from './../model/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {

    this.db.object('users/' + user.uid).update({
      email: user.email,
      name: user.displayName,
      isAdmin: false
    })
  }

  get(uid : string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}

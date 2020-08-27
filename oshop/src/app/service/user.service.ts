import { AuthService } from './auth.service';
import { AppUser } from './../model/app-user';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, private db: AngularFireDatabase) { }

  save(user: firebase.User) {

    // TODO [20-08-27] - Remove email 
    let admin =user.email === 'ithar.develop@gmail.com' ? true : false;
    this.db.object('users/' + user.uid).update({
      email: user.email,
      name: user.displayName,
      isAdmin: admin
    })
  }

  get(uid : string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  get appUser$(): Observable<AppUser> {

      return this.authService.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.get(user.uid).valueChanges()
          }  
        
          return EMPTY;
        })
      );
  }
}

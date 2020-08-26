import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authProvider: any;
  user$: Observable<firebase.User>;
  
  constructor(private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;  
  }

  login(provider : number) {
    switch (provider) {
      case 1: this.authProvider = new firebase.auth.GoogleAuthProvider();
              break;
      case 2: this.authProvider = new firebase.auth.FacebookAuthProvider();
              break;
      case 3: this.authProvider = new firebase.auth.TwitterAuthProvider();
              break;
      case 4: this.authProvider = new firebase.auth.GithubAuthProvider();
    }

    this.afAuth.signInWithRedirect(this.authProvider);
  }

  logout() {
    this.afAuth.signOut();
  }
}

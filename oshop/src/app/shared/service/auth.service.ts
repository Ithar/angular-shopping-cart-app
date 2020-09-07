import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from '@firebase/app';
import '@firebase/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authProvider: any;
  firebaseUser$: Observable<firebase.User>;
  
  constructor(private afAuth: AngularFireAuth, private router : Router) { 
    this.firebaseUser$ = afAuth.authState;  
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

  isLoggedIn(): Observable<boolean> {

    return this.firebaseUser$.pipe(
      map( user => {
        if (user) {
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      }
    ));
  }
}

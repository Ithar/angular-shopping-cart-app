import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private authProvider: any;

  constructor(private afAuth: AngularFireAuth) { 

  }

  loginProvider(provider: number) {
    
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
  
}

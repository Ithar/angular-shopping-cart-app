import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user$: Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth) { 
    this.user$ = afAuth.authState;    
  }

  logout() {
    this.afAuth.signOut();
  }
}

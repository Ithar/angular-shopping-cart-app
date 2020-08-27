import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { AppUser } from './../model/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appUser: AppUser; 

   constructor(private auth : AuthService, private userService : UserService) { 
    userService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
}

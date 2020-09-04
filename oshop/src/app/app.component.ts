import { NavigationService } from './service/navigation.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(authService : AuthService, userService: UserService, router: Router,location: Location, navigationService: NavigationService)  {

    location.onUrlChange(url => navigationService.urlChange(url));

    authService.firebaseUser$.subscribe(user => {
      if (user) {
        userService.save(user);
        router.navigateByUrl(navigationService.getReturnUrl());  
      }
    });
  }

}

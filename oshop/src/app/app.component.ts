import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/service/auth.service';
import { NavigationService } from './shared/service/navigation.service';
import { UserService } from './shared/service/user.service';

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

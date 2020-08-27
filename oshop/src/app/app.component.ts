import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private authService : AuthService, private userService: UserService, router : Router) {

    authService.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        router.navigateByUrl('/');  
      }
    });

  }

}

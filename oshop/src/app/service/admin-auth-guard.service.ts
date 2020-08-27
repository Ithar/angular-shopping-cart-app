import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate  {

  constructor(private authService : AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {

    return this.userService.appUser$
     .pipe(
       map(appUser => appUser.isAdmin)
     );
 
   }

}

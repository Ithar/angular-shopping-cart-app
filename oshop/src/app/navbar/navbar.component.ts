import { Cart } from '../shared/model/cart';
import { CartService } from '../shared/service/cart.service';
import { UserService } from '../shared/service/user.service';
import { AuthService } from '../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared/model/app-user';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<Cart>;

   constructor(private auth : AuthService, userService : UserService, private cartService: CartService) { 
    userService.appUser$.subscribe(appUser => this.appUser = appUser);      
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getOrCreateCart();
  }

  logout() {
    this.auth.logout();
  }
}

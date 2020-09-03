import { Cart } from './../model/cart';
import { CartService } from './../service/cart.service';
import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from './../model/app-user';
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

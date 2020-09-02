import { Cart } from './../model/cart';
import { CartService } from './../service/cart.service';
import { UserService } from './../service/user.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from './../model/app-user';
import { Observable} from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cartItemsCount: number;

   constructor(private auth : AuthService, private userService : UserService, private cartService: CartService) { 
    userService.appUser$.subscribe(appUser => this.appUser = appUser);      
  }

  async ngOnInit() {
    console.log('************** A ************ ')
    let cart$: Observable<Cart> = await this.cartService.getOrCreateCart();
    cart$.subscribe(cart => {

        console.log('************** B ************ ' + cart.totalQuantity + ' OR :' + this.cartService.calculateTotalQuantity(cart));

        this.cartItemsCount = cart.totalQuantity;
    });
    
     console.log('************** C ************');
  }
  

  logout() {
    this.auth.logout();
  }
}

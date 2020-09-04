import { Cart } from './../model/cart';
import { CartService } from './../service/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit, OnDestroy {

  cart: Cart;
  userSubscription: Subscription; 
  cartSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    let cart$ = this.cartService.getCartObservable();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}

import { Order } from './../model/order';
import { AuthService } from './../service/auth.service';
import { OrderService } from './../service/order.service';
import { Cart } from './../model/cart';
import { CartService } from './../service/cart.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit, OnDestroy, AfterViewInit {

  isLoading: boolean = true;
  userId: string;
  cart: Cart;
  order: Order;
  userSubscription: Subscription; 
  cartSubscription: Subscription;

  constructor(private authService: AuthService, private cartService: CartService, private orderService: OrderService) { }

  async ngOnInit() {

    let user$ = await this.authService.firebaseUser$;
    this.userSubscription = user$.subscribe(user => {
      this.userId = user.uid
    });

    let cart$ = await this.cartService.getCartObservable();
    this.cartSubscription = cart$.subscribe(cart => {
      this.cart = cart
    });
  }

  ngAfterViewInit(){
    this.setProcessOrderTimeout();   
  }

  setProcessOrderTimeout() {
    setTimeout( ()=> { 
      if (this.userId && this.cart) {
        this.placeOrder();
      } else {
        this.setProcessOrderTimeout()
      }
      
      this.isLoading =  false;
    }, 2000)
  }

  async placeOrder() {
    this.order = this.orderService.createAndPlaceOrder(this.userId, this.cart);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}

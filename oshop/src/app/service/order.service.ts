import { CartService } from './cart.service';
import { Order } from './../model/order';
import { AngularFireDatabase } from '@angular/fire/database';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: CartService) { }

  createAndPlaceOrder(userId: string , cart: Cart): Order {
    let order = new Order(userId, cart);
    this.db.list('/orders').push(order)
    .then(() => {
      console.log('DB: order saved');
      this.cartService.deleteCart();
    })
    .catch(e => console.log('Order failed to save to DB deu to : ' + e.message));
    return order;
  }

  

}

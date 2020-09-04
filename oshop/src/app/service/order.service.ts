import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { Order } from './../model/order';
import { AngularFireDatabase } from '@angular/fire/database';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';
import { User } from 'firebase';

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
    .catch(e => console.log('Order failed to save to DB due to : ' + e.message));
    return order;
  }

  getOrdersByUserId(user: User): Observable<any> {   
    return this.db.list('/orders', 
      ref => ref.orderByChild('userId').equalTo(user.uid)).valueChanges();
  }
}

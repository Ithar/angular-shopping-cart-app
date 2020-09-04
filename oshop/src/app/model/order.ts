import { CartItem } from './cart-item';
import { Cart } from './cart';
import { v4 as uuidv4 } from 'uuid';
import { Optional } from '@angular/core';

export class Order {
        
    orderId: string;
    userId: string;
    orderDate: number;
    items: any[];
    totalQuantity: number;
    totalPrice: number;

    constructor(userId: string, cart: Cart) {
        
        this.orderId = uuidv4();
        this.userId = userId;
        this.orderDate = new Date().getTime();

        let totalPrice = 0;
        let totalQuantity = 0;
        this.items = cart.cartItems.map(item => {

            let itemTotalPrice = item.price * item.quantity;
            totalQuantity += item.quantity; 
            totalPrice += itemTotalPrice;
            return {
                product: {
                    title: item.product.title,
                    image: item.product.image,
                    price: item.product.price,
                },
                quantity: item.quantity,
                price: itemTotalPrice
            }
        });

        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }
}
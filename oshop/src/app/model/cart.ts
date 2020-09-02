import { CartItem } from './cart-item';

export class Cart {
    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    totalQuantity: number = 0;
}
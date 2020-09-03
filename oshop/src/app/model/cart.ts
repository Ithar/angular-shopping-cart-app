import { CartItem } from './cart-item';

export class Cart {
        
    constructor(public cartItems: CartItem[]) {

    }

    get totalPrice(): number {

        let total: number = 0;
        
        this.cartItems.forEach(item => {
            total += (item.price * item.quantity);
        });
        
        return total;
    }

    get totalQuantity(): number {
    
        let quantity = 0;
    
        this.cartItems.forEach(item => {
          quantity += (item.quantity);
        });
    
        return quantity;
    }
}
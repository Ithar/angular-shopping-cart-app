import { Cart } from './cart';
import { v4 as uuidv4 } from 'uuid';

export class Order {
        
    orderId: string;
    userId: string;
    orderDate: number;
    items: any[];

    constructor(userId: string, cart: Cart) {
        
        this.orderId = uuidv4();
        this.userId = userId;
        this.orderDate = new Date().getTime();

        this.items = cart.cartItems.map(item => {

            let total = item.price * item.quantity;

            return {
                product: {
                    title: item.product.title,
                    image: item.product.image,
                    price: item.product.price,
                },
                quantity: item.quantity,
                total: total
            }
        });
    }
}
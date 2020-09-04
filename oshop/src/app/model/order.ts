import { Cart } from './cart';
export class Order {
        
    orderId: string;
    userId: string;
    orderDate: number;
    items: any[];

    constructor(orderId: string, userId: string, cart: Cart) {
        
        this.orderId = orderId;
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
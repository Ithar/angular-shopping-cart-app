import { Product } from './product';

export class CartItem {
    productId: string;
    product:  Product;
    quantity: number;
    price: number;
}
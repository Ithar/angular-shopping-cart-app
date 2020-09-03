import { BehaviorSubject} from 'rxjs';
import { CartItem } from './../model/cart-item';
import { Product } from './../model/product';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;
  private _cart: BehaviorSubject<Cart>  = new BehaviorSubject(new Cart());

  private LOCAL_STORAGE_CART_KEY: string = 'OSHOP-CART';

  constructor() { }

  async getOrCreateCart()  {

     let cart: Cart;
     let cartString = localStorage.getItem(this.LOCAL_STORAGE_CART_KEY);   

     console.log('CREATING CART: '+ cartString)
  
     if (cartString === null) {
       cart = new Cart();
     } else {
       cart = JSON.parse(cartString);
     }

    this.cart = cart;
    this._cart.next(this.cart);
    return this._cart.asObservable();
  }

  private saveCart() {
    localStorage.setItem(this.LOCAL_STORAGE_CART_KEY, JSON.stringify(this.cart)); 
  }

  deleteCart() {
    localStorage.removeItem(this.LOCAL_STORAGE_CART_KEY);  
  }

  private saveAndEmitCart() {
    this.calculateTotalQuantity();
    this.calculateTotalPrice();
    this._cart.next(this.cart);
    this.saveCart();
  } 

  addProduct(product: Product) {

    console.log('ADD PRODUCT');
    
    let cartItems: CartItem[] = this.cart.cartItems;

    let index = cartItems.findIndex(i => i.productId === product.id);
    if (index === -1) {
      this.addNewProduct(product, cartItems);
    } else {
      this.updateExistingProduct(index, cartItems);
    }

    this.saveAndEmitCart();
  }

  private addNewProduct(product: Product, cartItems: CartItem[]): CartItem[] {
      let cartItem: CartItem = new CartItem();
      cartItem.productId = product.id;
      cartItem.quantity = 1;
      cartItem.price = product.price;
      cartItems.push(cartItem);
      return cartItems;
  }

  private updateExistingProduct(index: number, cartItems: CartItem[]): CartItem[] {
    let cartItem: CartItem = cartItems[index];
    cartItem.quantity = cartItem.quantity +1; 
    cartItems[index] = cartItem;
    return cartItems;
  }

  removeProduct(product: Product) {

    console.log('REMOVE PRODUCT');

    let cartItems = this.cart.cartItems;
    let index = cartItems.findIndex(i => i.productId === product.id);
    let cartItem: CartItem = cartItems[index];

    if (cartItem.quantity === 1) {
      cartItems.splice(index, 1);
    } else {
      cartItem.quantity = cartItem.quantity - 1;
      cartItems[index] = cartItem;
    }

    this.saveAndEmitCart();
  }

  getProductQuantity(productId: string): number {

    let cart = (this.cart) ? this.cart : this.cart;
    let cartItems: CartItem[] = cart.cartItems;
    let index = cartItems.findIndex(i => i.productId === productId);

    return (index === -1) ? 0 : cartItems[index].quantity;
  }

  private calculateTotalPrice() {
    
    let total: number = 0;
    
    this.cart.cartItems.forEach(item => {
      total += (item.price * item.quantity);
    });
    
    this.cart.totalPrice = total;
  }

  private calculateTotalQuantity() {

    let quantity = 0;

    this.cart.cartItems.forEach(item => {
      quantity += (item.quantity);
    });

    this.cart.totalQuantity = quantity;
  }

}

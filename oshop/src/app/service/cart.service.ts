import { CartItem } from './../model/cart-item';
import { Product } from './../model/product';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;
  private LOCAL_STORAGE_CART_KEY: string = 'OSHOP-CART';

  constructor() { }


  getCart(): Cart {

    let cart: Cart;
    let cartString = localStorage.getItem(this.LOCAL_STORAGE_CART_KEY);   
    console.log('cart: ' +cartString);

    if (cartString === null) {
      cart = new Cart();
      cart.cartItems = [];
      cart.totalPrice = 0;
    } else {
      cart = JSON.parse(cartString);
    }

    this.cart = cart;
    return this.cart;
  }

  private saveCart() {
    localStorage.setItem(this.LOCAL_STORAGE_CART_KEY, JSON.stringify(this.cart)); 
  }

  deleteCart() {
    localStorage.removeItem(this.LOCAL_STORAGE_CART_KEY);  
  }

  addProduct(product: Product) {

    let cartItems: CartItem[] = this.getCart().cartItems;

    let index = cartItems.findIndex(i => i.productId === product.id);
    if (index === -1) {
      this.addNewProduct(product, cartItems);
    } else {
      this.updateExistingProduct(index, cartItems);
    }
          
    this.calculateCartTotal();
    this.saveCart();
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

    let cartItems = this.getCart().cartItems;
    let index = cartItems.findIndex(i => i.productId === product.id);
    let cartItem: CartItem = cartItems[index];

    if (cartItem.quantity === 1) {
      cartItems.splice(index, 1);
    } else {
      cartItem.quantity = cartItem.quantity -1;
      cartItems[index] = cartItem;
    }
  }

  private calculateCartTotal() {
    let total: number = 0;
    
    this.cart.cartItems.forEach(item => {
      total += (item.price * item.quantity);
    });
    
    this.cart.totalPrice = total;
  }

}

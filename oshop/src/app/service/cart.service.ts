import { Observable, of} from 'rxjs';
import { CartItem } from './../model/cart-item';
import { Product } from './../model/product';
import { Cart } from './../model/cart';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;
  cart$: Observable<Cart>;

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
    this.cart$ = of(cart);
    return this.cart$;
  }

  private saveCart() {
    console.log('SAVE');
    localStorage.setItem(this.LOCAL_STORAGE_CART_KEY, JSON.stringify(this.cart)); 
  }

  deleteCart() {
    console.log('DELETE');
    localStorage.removeItem(this.LOCAL_STORAGE_CART_KEY);  
  }

  async addProduct(product: Product) {

    console.log('ADD PRODUCT');
    
    // this.cart$.pipe(take(1), 
    //   map(c => {
    //     let cartItems: CartItem[] = c.cartItems;

    //     let index = cartItems.findIndex(i => i.productId === product.id);
    //     if (index === -1) {
    //       this.addNewProduct(product, cartItems);
    //     } else {
    //       this.updateExistingProduct(index, cartItems);
    //     }

    //     c.totalQuantity = 99;
    //     this.cart$ = of(c);
            
    //     this.saveCart();
    //   })
    // )




    let cartItems: CartItem[] = this.cart.cartItems;

    let index = cartItems.findIndex(i => i.productId === product.id);
    if (index === -1) {
      this.addNewProduct(product, cartItems);
    } else {
      this.updateExistingProduct(index, cartItems);
    }

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

    this.saveCart();
  }

  private calculateTotalPrice() {
    let total: number = 0;
    
    this.cart.cartItems.forEach(item => {
      total += (item.price * item.quantity);
    });
    
    this.cart.totalPrice = total;
  }

  calculateTotalQuantity(cart: Cart): number {

    let quantity = 0;

    console.log('TOP calculateTotalQuantity()');

    cart.cartItems.forEach(item => {
      quantity += (item.quantity);
    });

    this.cart.totalQuantity = quantity;
    console.log('calculateTotalQuantity()' +  quantity);

    return quantity;
  }

  getProductQuantity(productId: string): number {

    let cart = (this.cart) ? this.cart : this.cart;
    let cartItems: CartItem[] = cart.cartItems;
    let index = cartItems.findIndex(i => i.productId === productId);

    return (index === -1) ? 0 : cartItems[index].quantity;
    
  }

}

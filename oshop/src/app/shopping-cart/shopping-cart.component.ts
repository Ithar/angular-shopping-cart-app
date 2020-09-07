import { Cart } from '../shared/model/cart';
import { ProductService } from '../shared/service/product.service';
import { CartService } from '../shared/service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart;
  isCartEmpty: boolean = true;

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {

    this.isCartEmpty= false;

    this.productService.list().subscribe(products => {
      this.cartService.getCartObservable().subscribe(cart => {
        cart.cartItems.forEach(item => {
          item.product = this.productService.getById(item.productId, products);
        });
        this.cart = cart;
        this.isCartEmpty = cart.cartItems.length === 0  ? true : false ;
      });
    });
  }

  clear() {
    this.cartService.deleteCart();
    this.isCartEmpty= true;
  }
}

import { Cart } from './../model/cart';
import { ProductService } from './../service/product.service';
import { CartService } from './../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart;

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.list().subscribe(products => {
      this.cartService.getCart().subscribe(cart => {
        cart.cartItems.forEach(item => {
          item.product = this.productService.getById(item.productId, products);
        });
        this.cart = cart;
      });
    });
  }
}

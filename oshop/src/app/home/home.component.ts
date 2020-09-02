import { CartService } from './../service/cart.service';
import { CategoryService } from './../service/category.service';
import { ProductService } from './../service/product.service';
import { Product } from './../model/product';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  allProducts: Product[];
  products: Product[] = [];
  subscription: Subscription;

  categories$;
  selectedCategory: string;

  constructor(private productService: ProductService, categoryService: CategoryService, private cartService: CartService) { 
    this.subscription = productService.list().subscribe( p => {
      this.allProducts = p;
      this.products = p;
    });

    this.categories$ = categoryService.list();
  }

  filter(category: string) {

    this.selectedCategory = category;
    this.products = this.productService.filterByCategory(category, this.allProducts);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
  
  removeFromCart(product: Product) {
    this.cartService.removeProduct(product);
  }

  getProductQuantity(productId: string): number {
    return this.cartService.getProductQuantity(productId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

import { Product } from './../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../service/product.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  allProducts: Product[];
  products: Product[];
  subscription: Subscription

  constructor(private productService: ProductService) { 
    
    this.subscription = productService.list().subscribe(p => 
      { 
        this.allProducts = p;
       this.products = this.allProducts;
      });   
  }

  search(searchTerm: string) {
    this.products = this.productService.filterByTitle(searchTerm, this.allProducts);   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }
}

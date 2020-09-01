import { Product } from './../../model/product';
import { Observable, Subscription } from 'rxjs';
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

  constructor(productService: ProductService) { 
    
    this.subscription = productService.list().subscribe(p => 
      { 
        this.allProducts = p;
       this.products = this.allProducts;
      });   
  }

  search(searchTerm: string) {

    if (searchTerm) {
      this.products = this.allProducts.filter(p => 
        p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    } else {
      this.products = this.allProducts;
    }
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }
}

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

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription

  constructor(productService: ProductService) { 
    
    this.subscription = productService.list().subscribe(p => 
      { 
        this.products = p;
       this.filteredProducts = this.products;
      });   
  }

  search(searchTerm: string) {

    if (searchTerm) {
      this.filteredProducts = this.products.filter(p => 
        p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    } else {
      this.filteredProducts = this.products;
    }
    
  }

  ngOnDestroy() {
    console.log('unsubscribe called ... ')
    this.subscription.unsubscribe();  
  }
}

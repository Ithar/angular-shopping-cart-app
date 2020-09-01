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

  products: Product[] = [];
  subscription: Subscription;

  categories$;

  constructor(productService: ProductService, categoryService: CategoryService) { 
    this.subscription = productService.list().subscribe( p => this.products = p);

    this.categories$ = categoryService.list();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

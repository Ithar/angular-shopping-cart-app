import { ProductService } from './../../service/product.service';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {

  categories$;
  
    constructor(private productService: ProductService, categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

  save(product) {
    this.productService.save(product);
  }
}

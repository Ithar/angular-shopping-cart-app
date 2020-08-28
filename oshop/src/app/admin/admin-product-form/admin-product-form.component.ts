import { ProductService } from './../../service/product.service';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {

  product;
  categories$;

  successMsg: boolean = false;
  
  constructor(private productService: ProductService, categoryService: CategoryService, router: ActivatedRoute) { 
      this.getById(productService, router);
      this.getCategories(categoryService);
  }

  ngOnInit(): void {
  }

  getById(productService: ProductService, router: ActivatedRoute) {
    let id = router.snapshot.paramMap.get('id');

    if (id) {
      productService.get(id).subscribe(p => this.product = p);
    }
  }

  getCategories(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  save(product) {

    this.productService.save(product)
    .then(() => {
      this.successMsg = true;

      setTimeout(() => {
        this.successMsg = false;
     }, 3000)

    });
  }
}

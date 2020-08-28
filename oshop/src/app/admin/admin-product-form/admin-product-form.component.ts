import { Product } from './../../model/product';
import { ProductService } from './../../service/product.service';
import { CategoryService } from './../../service/category.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent {

  id: string;
  product = {};
  categories$;
  
  isUpdate: boolean = false;
  showAddditionsMsg: boolean = false;
  showUpdateMsg: boolean = false;
  
  constructor(private productService: ProductService, categoryService: CategoryService, private router: Router, activeRouter: ActivatedRoute) { 

    let id = activeRouter.snapshot.paramMap.get('id');

    this.getById(id, productService);
    this.getCategories(categoryService);

    if (id) {
      this.isUpdate = true;
      this.id = id;
    }
  }

  getById(id: string, productService: ProductService) {
    
    if (id) {
      productService.get(id).subscribe(p => this.product = p);
    }
  }

  getCategories(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }

  save(product) {

    if (this.id) {
      this.productService.update(this.id, product)
      .then(() => {
        this.showUpdateMsg = true;
        setTimeout(() => {
          this.showUpdateMsg = false;
        }, 3000)
      });
    } else {
      this.productService.save(product)
      .then(() => {
        this.showAddditionsMsg = true;
        setTimeout(() => {
          this.showAddditionsMsg = false;
        }, 3000)
      });
    }    
  }

  delete() {
    if (this.id) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}

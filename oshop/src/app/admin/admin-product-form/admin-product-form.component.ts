import { Product } from './../../model/product';
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

  id: string;
  product = {};
  categories$;
  
  isUpdate: boolean = false;
  showAddditionsMsg: boolean = false;
  showUpdateMsg: boolean = false;
  
  constructor(private productService: ProductService, categoryService: CategoryService, router: ActivatedRoute) { 

    let id = router.snapshot.paramMap.get('id');

    this.getById(id, productService);
    this.getCategories(categoryService);

    if (id) {
      this.isUpdate = true;
      this.id = id;
    }
  }

  ngOnInit(): void {
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
}

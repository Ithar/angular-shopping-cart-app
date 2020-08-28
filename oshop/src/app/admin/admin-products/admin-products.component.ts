import { Observable } from 'rxjs';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$: Observable<any[]>

  constructor(productService: ProductService) { 
    this.products$ =  productService.list();
  }

  ngOnInit(): void {
  }

}

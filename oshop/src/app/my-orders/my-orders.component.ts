import { AuthService } from '../shared/service/auth.service';
import { OrderService } from '../shared/service/order.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(private authService: AuthService, private oderService: OrderService) { 
    
  }

   ngOnInit(): void {
    
    this.orders$ = this.authService.firebaseUser$.pipe(
      switchMap(user => this.oderService.getOrdersByUserId(user))
    );
  }
}
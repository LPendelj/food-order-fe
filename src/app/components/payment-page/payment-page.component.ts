import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  order: Order = new Order();

  constructor(
    private orderService: OrderService,
    private router: Router
  ){
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) =>{
        this.order = order
      },
      error: () => {
        this.router.navigateByUrl('/checkout')
      }
    })
  }
}

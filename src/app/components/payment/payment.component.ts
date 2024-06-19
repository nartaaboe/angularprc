import { Component } from '@angular/core';
import {paymentMethods} from "../../app.models";
import {OrderService} from "../../services/order.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentMethod!: string;
  paymentMethods = [...paymentMethods];
  constructor(private orderService: OrderService, private router: Router) {
  }
  putPaymentDetails(){
    console.log(this.paymentMethod);
    this.orderService.putPaymentDetails(this.paymentMethod).subscribe((order) => {
      console.log(order);
      this.router.navigate(['/orders', order.id]);
    });
    localStorage.removeItem('orderId');
  }
}

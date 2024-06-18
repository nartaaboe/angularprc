import { Component } from '@angular/core';
import {paymentMethods} from "../../app.models";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentMethod!: string;
  paymentMethods = [...paymentMethods];
  constructor() {
  }
}

import {Component, OnInit} from '@angular/core';
import {Order} from "../../app.models";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders!: Order[];
  constructor(private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders(){
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    })
  }
}

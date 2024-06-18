import {Component, OnInit} from '@angular/core';
import {Order, orderStatuses} from "../../app.models";
import {OrderService} from "../../services/order.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{
  order!: Order;
  oderStatuses = orderStatuses;
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.getOrder();
  }
  getOrder(){
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.orderService.getOrderById(id).subscribe((order) => {
        this.order = order;
      })
    });
  }
  updateOrderStatus(id: number){

  }

  protected readonly orderStatuses = orderStatuses;
}

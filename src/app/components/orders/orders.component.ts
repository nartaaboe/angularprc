import {Component, OnInit} from '@angular/core';
import {Order} from "../../app.models";
import {OrderService} from "../../services/order.service";
import {WebSocketService} from "../../services/websocket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
  orders!: Order[];
  orderUpdatesSubscription!: Subscription;
  constructor(private orderService: OrderService,
              private webSocketService: WebSocketService) {
  }
  ngOnInit(): void {
    this.getOrders();
    this.subscribeToOrderUpdates();
  }
  getOrders(){
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    })
  }
  subscribeToOrderUpdates(){
    this.orderUpdatesSubscription = this.webSocketService.getOrderUpdates().subscribe((order) => {
      console.log('Order update received in component:', order);
      if(order){
        const index = this.orders.findIndex(item => item.id === order.id)
        if(index !== -1){
          this.orders[index] = order;
        }
        else{
          this.orders.push(order);
        }
      }
    })
  }
}

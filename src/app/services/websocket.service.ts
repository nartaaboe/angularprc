import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;
  private cartUpdates: BehaviorSubject<any> = new BehaviorSubject(null);
  private orderUpdates: BehaviorSubject<any> = new BehaviorSubject(null);
  private productUpdates: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });

    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/ws');
    };

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + JSON.stringify(frame));
      this.subscribeToCartUpdates();
      this.subscribeToOrderUpdates();
      this.subscribeToProductUpdates();
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  private subscribeToCartUpdates() {
    this.client.subscribe('/topic/cart', (message) => {
      const cartItem = JSON.parse(message.body);
      this.cartUpdates.next(cartItem);
    });
  }
  public getCartUpdates() {
    return this.cartUpdates.asObservable();
  }
  private subscribeToOrderUpdates(){
    console.log('Subscribing to order updates');
    this.client.subscribe('/topic/order', (message) => {
      const order = JSON.parse(message.body);
      console.log('Received order update:', order);
      this.orderUpdates.next(order);
    })
  }
  public getOrderUpdates(){
    return this.orderUpdates.asObservable();
  }
  private subscribeToProductUpdates(){
    this.client.subscribe('/topic/product', (message) => {
      const product = JSON.parse(message.body);
      this.productUpdates.next(product);
    })
  }
  public getProductUpdates(){
    return this.productUpdates.asObservable();
  }
}

import {Component, OnInit} from '@angular/core';
import {Cart, Order} from "../../app.models";
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {WebSocketService} from "../../services/websocket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart!: Cart;
  cartUpdatesSubscription!: Subscription;
  placedOrder!: Order;
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private webSocketService: WebSocketService) {
  }
  ngOnInit(): void {
    this.getCartByUserId();
    this.subscribeToCartUpdates();
  }

  ngOnDestroy(): void {
    if (this.cartUpdatesSubscription) {
      this.cartUpdatesSubscription.unsubscribe();
    }
  }

  getCartByUserId() {
    this.cartService.getCartByUserId().subscribe((cart) => {
      this.cart = cart;
    });
  }

  placeOrder() {
    this.orderService.placeOrder().subscribe((order) => {
      console.log(order);
      this.placedOrder = order;
      localStorage.setItem('orderId', JSON.stringify(order.id));
      this.router.navigate(['/payment']);
    });
  }

  increaseQuantity(cartItemId: number) {
    this.cartService.increaseQuantity(cartItemId).subscribe((response) => {
      console.log(response);
    });
  }
  decreaseQuantity(cartItemId: number) {
    this.cartService.decreaseQuantity(cartItemId).subscribe((response) => {
      console.log(response);
    });
  }
  delete(id: number) {
    this.cartService.removeFromCart(id).subscribe((response) => {
      console.log(response);
    });
  }

  subscribeToCartUpdates() {
    this.cartUpdatesSubscription = this.webSocketService.getCartUpdates().subscribe((cartItem) => {
      if (cartItem) {
        const index = this.cart.cartItems.findIndex(item => item.id === cartItem.id);
        if (index !== -1) {
          this.cart.cartItems[index] = cartItem;
        } else {
          this.cart.cartItems.push(cartItem);
        }
      }
    });
  }
}

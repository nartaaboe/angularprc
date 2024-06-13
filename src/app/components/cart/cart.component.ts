import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../app.models";
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart!: Cart;
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {
  }
  ngOnInit(): void {
    this.getCartByUserId();
  }
  getCartByUserId() {
    this.cartService.getCartByUserId().subscribe((cart) => {
      this.cart = cart;
    })
  }
  placeOrder(){
    this.orderService.placeOrder().subscribe((response) => {
      console.log(response);
      this.router.navigate(['/orders']);
    });
  }
  increaseQuantity(cartItemId: number) {
    this.cartService.increaseQuantity(cartItemId).subscribe((response) => {
      console.log(response);
    })
  }
  delete(id: number) {
    this.cartService.removeFromCart(id).subscribe((response) => {
      console.log(response);
    })
  }
}

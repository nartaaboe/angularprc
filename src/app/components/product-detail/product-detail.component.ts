import {Component, OnInit} from '@angular/core';
import {Product} from "../../app.models";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {Subscription} from "rxjs";
import {WebSocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  productUpdatesSubscription!: Subscription;
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private webSocketService: WebSocketService) {
  }
  getProduct(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
      })
    })
  }
  ngOnInit(): void {
    this.getProduct()
    this.subscribeToProductUpdates();
  }
  addToCart() {
    this.cartService.addToCart(this.product).subscribe(
      response => {
        console.log(response);
      }
    );
  }
  subscribeToProductUpdates() {
    this.productUpdatesSubscription = this.webSocketService.getProductUpdates().subscribe((product) => {
      if (product) {
        if(product.id == this.product.id) {
          this.product = product;
        }
        else{
          console.log("Error xz!");
        }
      }
    });
  }
}

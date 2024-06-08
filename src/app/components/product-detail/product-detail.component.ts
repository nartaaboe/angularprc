import {Component, OnInit} from '@angular/core';
import {Product} from "../../app.models";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {
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
  }
}

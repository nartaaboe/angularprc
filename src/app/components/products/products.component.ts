import {Component, OnInit} from '@angular/core';
import {Product} from "../../app.models";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products!: Product[];
  constructor(private productService: ProductService) {
  }
  getProducts(){
    const categoryId = localStorage.getItem('categoryId')
    if(categoryId){
      this.productService.getProductsByCategory(Number(categoryId)).subscribe((products) => {
        this.products = products;
      })
    }
    else{
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
      })
    }
  }
  ngOnInit(): void {
    this.getProducts();
  }
}

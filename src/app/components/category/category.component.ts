import {Component, OnInit} from '@angular/core';
import {Category, Product} from "../../app.models";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories!: Category[];
  constructor(private productService: ProductService, private router: Router) {
  }
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() : void {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }
  getProductsByCategory(categoryId : number) : void {
    localStorage.setItem('categoryId', categoryId.toString());
    this.router.navigate(["/products"]);
  }
}

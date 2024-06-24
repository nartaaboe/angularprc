import {Component, OnInit} from '@angular/core';
import {Category} from "../../app.models";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories!: Category[];
  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(){
    console.log("Fetching...")
    this.categoryService.getCategories().subscribe((data) => {
      console.log("Received data.")
      this.categories = data;
    })
  }
}

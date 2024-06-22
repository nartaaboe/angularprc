import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart, Category, Product} from "../app.models";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL = 'http://localhost:8080/products';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}`);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
  }
  getCategories(){
    return this.http.get<Category[]>(`${this.BASE_URL}/categories`);
  }
  getProductsByCategory(categoryId: number){
    return this.http.get<Product[]>(`${this.BASE_URL}/${categoryId}`);
  }
  update(id: number, product: Product){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Product>(`${this.BASE_URL}/product${id}`, product, {headers});
  }
  delete(id: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.BASE_URL}/${id}`, {headers});
  }
}

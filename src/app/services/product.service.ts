import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../app.models";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL = 'http://localhost:8080/products';
  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]>{
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product[]>(`${this.BASE_URL}`, {headers});
  }
  getProduct(id: number): Observable<Product> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Product>(`${this.BASE_URL}/${id}`, {headers});
  }
}

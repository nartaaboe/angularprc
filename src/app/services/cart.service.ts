import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cart, CartItem, Product} from "../app.models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  BASE_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getCartByUserId(): Observable<Cart> {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cart>(`${this.BASE_URL}/carts/${userId}`, { headers });
  }
  addToCart(product: Product): Observable<any> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.BASE_URL}/products/${userId}`, product, {headers});
  }
  increaseQuantity(cartItemId: number): Observable<any>{
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.BASE_URL}/carts/${userId}/${cartItemId}`, null, {headers});
  }
  removeFromCart(id: number): Observable<any> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.BASE_URL}/carts/${userId}/${id}`, {headers});
  }
}

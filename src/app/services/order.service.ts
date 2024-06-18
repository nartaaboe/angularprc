import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Order} from "../app.models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  BASE_URL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if(role == 'ADMIN'){
      return this.http.get<Order[]>(`${this.BASE_URL}/orders`, { headers });
    }
    const userId = localStorage.getItem('userId');
    return this.http.get<Order[]>(`${this.BASE_URL}/orders/${userId}`, { headers });
  }


  getOrderById(id: number): Observable<Order> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Order>(`${this.BASE_URL}/orders/${userId}/${id}`, { headers });
  }

  placeOrder(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.BASE_URL}/carts/${userId}`, {}, { headers });
  }

  updateOrderStatus(status: string, id: number): Observable<Order> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Order>(`${this.BASE_URL}/${userId}/${id}/status`, status, { headers });
  }

  deleteOrder(id: number, adminId: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.BASE_URL}/${id}/${adminId}`, { headers });
  }
}

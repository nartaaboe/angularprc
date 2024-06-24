import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthResponse, Cart, LoginRequest, RegisterRequest} from "../app.models";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, registerRequest);
  }
  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest);
  }
  saveUserData(token: string, userId: number, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('role', role);
  }
  isTokenValid(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/isTokenValid`, token);
  }
  logout(): void {
    localStorage.removeItem('token');
  }
}

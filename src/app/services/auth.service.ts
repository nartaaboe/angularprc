import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {LoginRequest} from "../app.models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, loginRequest)
      .pipe(map(response => this.storeToken(response.token)));
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  private storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}

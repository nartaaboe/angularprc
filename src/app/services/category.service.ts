import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../app.models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL = 'http://localhost:8080/categories';
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.BASE_URL);
  }
}

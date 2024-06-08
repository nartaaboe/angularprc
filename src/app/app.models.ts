import {AuthService} from "./services/auth.service";

export interface Product{
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export class LoginRequest{
  username: string;
  password: string;
  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }

}

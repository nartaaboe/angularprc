import {AuthService} from "./services/auth.service";

export interface Category{
  id: number;
  image: string;
  name: string;
  products: Product[];
}

export interface Product{
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  rating: number;
  category: Category;
  reviews: Review[];
  orderItems: OrderItem[];
  cartItems: CartItem[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  orders: Order[];
  cart: Cart;
}

export class LoginRequest{
  username: string;
  password: string;
  constructor(username: string, password: string){
    this.username = username;
    this.password = password;
  }

}

export interface Order{
  id: number;
  user: User;
  orderItems: OrderItem[];
  payment: Payment;
  status: string;
}
export interface OrderItem{
  id: number;
  order: Order;
  product: Product;
  quantity: number;
}
export interface Cart{
  id: number;
  user: User;
  cartItems: CartItem[];
}
export interface CartItem{
  id: number;
  cart: Cart;
  product: Product;
  quantity: number;
}
export interface Review{
  id: number;
  User: User;
  product: Product;
  comment: string;
  rating: number;
}
export interface Payment{
  id: number;
  order: Order;
  paymentMethod: string;
  status: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface JwtResponse{
  token: string;
  refreshToken: string;
}
export interface AuthResponse {
  userResponse: UserResponse;
  jwtResponse: JwtResponse;
}

export class RegisterRequest{
  username: string;
  email: string;
  password: string;
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}


export const orderStatuses = [
  {
    status: 'PENDING',
  },
  {
    status: 'PROCESSING',
  },
  {
    status: 'SHIPPED',
  },
  {
    status: 'DELIVERED',
  },
  {
    status: 'CANCELLED',
  },
  {
    status: 'RETURNED',
  },
]

export const paymentMethods = [
  {
    method: 'CREDIT_CARD',
  },
  {
    method: 'DEBIT_CARD',
  },
  {
    method: 'PAYPAL',
  },
  {
    method: 'CASH_ON_DELIVERY',
  },
  {
    method: 'BANK_TRANSFER',
  },
]

export const paymentStatuses = [
  {
    status: 'PENDING',
  },
  {
    status: 'COMPLETED',
  },
  {
    status: 'FAILED',
  },
  {
    status: 'REFUNDED',
  },
]


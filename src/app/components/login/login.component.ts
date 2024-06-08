import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../app.models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {
  }
  login(): void {
    this.authService.login(new LoginRequest(this.username, this.password)).subscribe(
      () => {
        console.log('Login successful')
        this.router.navigate(['/products'])
      }
    )
  }
}

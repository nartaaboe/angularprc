import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../app.models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  constructor(private authService: AuthService, private router: Router) {}
  username = '';
  email = '';
  password = '';
  register(){
    this.authService.register(new RegisterRequest(this.username, this.email, this.password)).subscribe((response) => {
      console.log(response);
      this.authService.login(new LoginRequest(this.username, this.password)).subscribe(
        (response: AuthResponse) => {
          const token = response.jwtResponse.token
          const userId = response.userResponse.id;
          const role = response.userResponse.role;
          this.authService.saveUserData(token, userId, role);
          console.log('User ID:', userId);
          this.router.navigate(['/products'])
        }
      );
    })
  }
}

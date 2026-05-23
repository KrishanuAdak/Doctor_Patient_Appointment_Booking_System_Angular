import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../springboot-api-services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthDB } from '../models/AuthDB';

@Component({
  selector: 'app-login-regsister',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, HttpClientModule],
  templateUrl: './login-regsister.component.html',
  styleUrls: ['./login-regsister.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ],
  providers: [AuthService] // <-- Add this line
})
export class LoginRegsisterComponent {
password: any;
  constructor(private authService: AuthService, private router: Router) {}

  isLogin = true;
  role: 'patient' | 'doctor' = 'patient';
  UserDetails: AuthDB = {
    email: '',
    password: '',
    role: this.role
  };

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  setRole(r: 'patient' | 'doctor') {
    this.role = r;
  }
  submitForm() {
    if(this.isLogin){
      this.authService.loginUser(this.UserDetails).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    } else {
      this.authService.registerUser(this.UserDetails).subscribe({
        next: (res) => {
          console.log('Registration successful:', res);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });
    }
  }
  
 
}

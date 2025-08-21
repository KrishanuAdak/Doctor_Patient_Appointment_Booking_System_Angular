import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../springboot-api-services/auth.service';
import { HttpClientModule } from '@angular/common/http';

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

  showLogin = true; // default screen = login
  selectedRole: string = 'patient'; // default role

  constructor(private authService: AuthService) { }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  onGoogleLogin() {
    alert('🚀 Google Login coming soon!');
  }

  setRole(role: string) {
    this.selectedRole = role;
  }

  onLogin(form: any) {
    console.log('Login:', form.value);
  }

  onRegister(form: any) {
    const data = { ...form.value, role: this.selectedRole };
    this.authService.registerUser(data).subscribe({
      next: (res: any) => console.log('Registered successfully', res),
      error: (err) => console.error('Registration error', err)
    });
    this.showLogin=true;
  } 
}

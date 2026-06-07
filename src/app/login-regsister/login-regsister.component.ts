import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from '../springboot-api-services/auth.service'; // adjust path if needed
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-regsister.component.html',
  styleUrls: ['./login-regsister.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ maxHeight: '0', opacity: 0 }),
        animate('350ms ease', style({ maxHeight: '200px', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ maxHeight: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class LoginRegisterComponent implements OnInit {

  isLogin: boolean = true;
  role: string = 'patient';
  showPassword: boolean = false;
  submitSuccess: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  userDetails = {
    name: '',
    email: '',
    password: '',
    phone: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setRole(r: string): void {
    this.role = r;
    this.errorMessage = '';
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
    this.resetForm();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle(): void {
    console.log('Google login clicked');
    // TODO: hook up Google OAuth
  }

  submitForm(): void {
    this.errorMessage = '';
    if (this.isLogin) {
      this.handleLogin();
    } else {
      this.handleRegister();
    }
  }

  private handleLogin(): void {
    this.isLoading = true;

    const payload = {
      email: this.userDetails.email,
      password: this.userDetails.password,
      role: this.role
    };

    this.authService.loginUser(payload).subscribe({
      next: (res) => {
        // JWT is set as HttpOnly cookie by Spring Boot
        // Angular never stores or reads the token
        console.log('Login success:', res);
        this.isLoading = false;
        this.showSuccess();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Invalid email or password.';
        console.error('Login error:', err);
      }
    });
  }

  private handleRegister(): void {
    this.isLoading = true;

    const payload = {
      name: this.userDetails.name,
      email: this.userDetails.email,
      password: this.userDetails.password,
      phone: this.userDetails.phone,
      role: this.role
    };

    this.authService.registerUser(payload).subscribe({
      next: (res) => {
        // JWT cookie set automatically by Spring Boot
        console.log('Register success:', res);
        this.isLoading = false;
        this.showSuccess();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
        console.error('Register error:', err);
      }
    });
  }

  private showSuccess(): void {
    this.submitSuccess = true;
    setTimeout(() => {
      this.submitSuccess = false;
      // Cookie already in browser — just navigate
      this.router.navigate(['/dashboard']);
      //   this.router.navigate(['/dashboard']);
      // } else {
      //   this.router.navigate(['/patient/dashboard']);
      // }
    }, 1500);
  }

  private resetForm(): void {
    this.userDetails = {
      name: '',
      email: '',
      password: '',
      phone: ''
    };
    this.showPassword = false;
    this.submitSuccess = false;
    this.isLoading = false;
    this.errorMessage = '';
  }
}
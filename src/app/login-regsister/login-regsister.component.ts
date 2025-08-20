import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login-regsister',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
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
  ]
})
export class LoginRegsisterComponent {
  showLogin = true; // default screen = login
  selectedRole: string = 'patient'; // default role

  // ✅ Toggle between login and register forms
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
    console.log('Register:', { ...form.value, role: this.selectedRole });
  }
}

import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Update the path if 'auth.service.ts' is located elsewhere, for example:
import { AuthService } from '../springboot-api-services/auth.service'; // Adjust the path as necessary
// Or, if it's in 'src/app/services/auth.service.ts':
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
   animations: [
    trigger('cardAnim', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class DashboardComponent {
  username: string | null = null;
  constructor(private authService: AuthService) {
      this.username = localStorage.getItem('token');
      console.log('username',this.username);
   }

  

   logout(){
    this.authService.logout();
    window.location.reload(); // Reload the page to reflect the logout

   }
}

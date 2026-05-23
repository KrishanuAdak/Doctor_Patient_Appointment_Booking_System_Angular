import { Component } from '@angular/core';
import { AuthService } from '../springboot-api-services/auth.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css',
  providers: [AuthService]
})
export class DashboardNavbarComponent {
  username: string | null = null;
    userRole: string | null = null;
    constructor(private authService: AuthService) {
        this.username = this.authService.getUsername();
        this.userRole = this.authService.extractUserRole();
        console.log('username',this.username);
        console.log('userRole',this.userRole);
    }
  
    
  
     logout(){
      this.authService.logout();
      window.location.reload(); // Reload the page to reflect the logout
     }
  
     

}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Update the path if 'auth.service.ts' is located elsewhere, for example:
import { AuthService } from '../springboot-api-services/auth.service'; // Adjust the path as necessary
// Or, if it's in 'src/app/services/auth.service.ts':
// import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';
import { Router, RouterLink } from '@angular/router';
import { DashboardNavbarComponent } from '../dashboard-navbar/dashboard-navbar.component';
import { Doctor } from '../models/Doctor';
import { TimeSlot } from '../models/TimeSlot';
import { Appointment } from '../models/Appointment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    DashboardNavbarComponent,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('cardAnim', [
      state('in', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('400ms ease-out'),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
   activeRole: 'doctor' | 'patient' = 'patient';
  activeView: string = 'home';
  selectedDoctor: Doctor | null = null;
  selectedDate: string = '';
  selectedSlot: string = '';
  bookingStep: number = 1;
  bookingSuccess: boolean = false;
  filterSpecialty: string = 'All';
  searchQuery: string = '';
  appointmentFilter: string = 'all';
  sidebarOpen: boolean = false;
  notificationCount: number = 3;
 
  today: string = '';
  currentTime: string = '';
 
  specialties = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Dermatology', 'Pediatrics', 'Oncology'];
 
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    //this.username = this.authService.getUsername();
    // this.userRole = this.authService.extractUserRole();
    // console.log('username', this.username);
    // console.log('userRole', this.userRole);
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
     const now = new Date();
    this.today = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.currentTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    this.selectedDate = new Date().toISOString().split('T')[0];
  }
  
  

  logout() {
  this.authService.logout().subscribe({
    next: () => {
      this.authService.setLoggedIn(false); // ← mark as logged out
      this.router.navigate(['/login/register']);
    },
    error: () => {
      this.authService.setLoggedIn(false);
      this.router.navigate(['/login/register']);
    }
  });
}
 
  timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '04:30 PM', available: true },
  ];
 
    doctors: Doctor[] = [
    {
      id: 1, name: 'Dr. Arjun Mehta', specialty: 'Cardiology', initials: 'AM', rating: 4.9, experience: 14, available: true, nextSlot: '10:00 AM', patientsToday: 12, fee: 800, hospital: 'Apollo Hospital', color: '#0ea5e9',
      specialization: ''
    },
    {
      id: 2, name: 'Dr. Priya Sharma', specialty: 'Neurology', initials: 'PS', rating: 4.8, experience: 11, available: true, nextSlot: '11:30 AM', patientsToday: 9, fee: 1000, hospital: 'Fortis Healthcare', color: '#8b5cf6',
      specialization: ''
    },
    {
      id: 3, name: 'Dr. Rohan Das', specialty: 'Orthopedics', initials: 'RD', rating: 4.7, experience: 9, available: false, nextSlot: 'Tomorrow', patientsToday: 15, fee: 700, hospital: 'Max Hospital', color: '#10b981',
      specialization: ''
    },
    {
      id: 4, name: 'Dr. Sneha Kapoor', specialty: 'Dermatology', initials: 'SK', rating: 4.6, experience: 7, available: true, nextSlot: '02:00 PM', patientsToday: 18, fee: 600, hospital: 'Medanta', color: '#f59e0b',
      specialization: ''
    },
    {
      id: 5, name: 'Dr. Vikram Nair', specialty: 'Pediatrics', initials: 'VN', rating: 4.9, experience: 16, available: true, nextSlot: '03:30 PM', patientsToday: 22, fee: 500, hospital: 'AIIMS', color: '#ef4444',
      specialization: ''
    },
    {
      id: 6, name: 'Dr. Ananya Roy', specialty: 'Oncology', initials: 'AR', rating: 4.8, experience: 13, available: false, nextSlot: 'Tomorrow', patientsToday: 6, fee: 1200, hospital: 'Tata Memorial', color: '#06b6d4',
      specialization: ''
    },
  ];
 

  appointments: Appointment[] = [
    {
      id: 1, doctorName: 'Rahul Gupta', date: '2025-06-08', status: 'upcoming',
      patientName: '',
      patientInitials: '',
      specialty: '',
      time: '',
      type: 'in-person',
      age: 0,
      avatarColor: ''
    },
       {
         id: 2, doctorName: 'Rahul Gupta', date: '2025-06-08', status: 'upcoming',
         patientName: '',
         patientInitials: '',
         specialty: '',
         time: '',
         type: 'in-person',
         age: 0,
         avatarColor: ''
       },
           {
             id: 3, doctorName: 'Rahul Gupta', date: '2025-06-08', status: 'upcoming',
             patientName: '',
             patientInitials: '',
             specialty: '',
             time: '',
             type: 'in-person',
             age: 0,
             avatarColor: ''
           }
  ]

;
 
   
 
  get filteredDoctors(): Doctor[] {
    return this.doctors.filter(d => {
      const matchSpec = this.filterSpecialty === 'All' || d.specialization === this.filterSpecialty;
      const matchSearch = d.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchSpec && matchSearch;
    });
  }
 
  get filteredAppointments(): Appointment[] {
    if (this.appointmentFilter === 'all') return this.appointments;
    return this.appointments.filter(a => a.status === this.appointmentFilter);
  }
 
  get upcomingCount(): number { return this.appointments.filter(a => a.status === 'upcoming').length; }
  get completedCount(): number { return this.appointments.filter(a => a.status === 'completed').length; }
  get pendingCount(): number { return this.appointments.filter(a => a.status === 'pending').length; }
  get availableDoctorsCount(): number { return this.doctors.filter(d => d.available).length; }
  get todayAppointments(): Appointment[] { return this.appointments.filter(a => a.date === '2025-06-08'); }
 
  get doctorTodayAppointments(): Appointment[] {
    return this.appointments.filter(a => a.doctorName === 'Dr. Arjun Mehta');
  }
 
  switchRole(role: 'doctor' | 'patient') {
    this.activeRole = role;
    this.activeView = 'home';
    this.bookingStep = 1;
    this.bookingSuccess = false;
  }
 
  setView(view: string) {
    this.activeView = view;
    this.bookingStep = 1;
    this.bookingSuccess = false;
    this.sidebarOpen = false;
  }
 
  openBooking(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.selectedSlot = '';
    this.bookingStep = 1;
    this.activeView = 'book';
  }
 
  selectSlot(slot: TimeSlot) {
    if (slot.available) this.selectedSlot = slot.time;
  }
 
  nextStep() {
    if (this.bookingStep < 3) this.bookingStep++;
  }
 
  prevStep() {
    if (this.bookingStep > 1) this.bookingStep--;
  }
 
  confirmBooking() {
    this.bookingSuccess = true;
    this.bookingStep = 3;
  }
 
  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
 
  updateStatus(appt: Appointment, status: 'completed' | 'cancelled') {
    appt.status = status;
  }
 
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
 



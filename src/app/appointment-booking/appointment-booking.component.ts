import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AppointmentService } from '../services/appointment.service';
// import { DoctorService } from '../services/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../springboot-api-services/auth.service';



@Component({
  selector: 'app-appointment-booking',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './appointment-booking.component.html',
  styleUrls: ['./appointment-booking.component.css']
})
export class AppointmentBookingComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors: any[] = [];
  isLoading: boolean = false;
  username: string | null = null;
  userRole: string | null = null;

  constructor(private fb: FormBuilder,
              // private doctorService: DoctorService,
              // private appointmentService: AppointmentService,
              private snackBar: MatSnackBar,
              private authService: AuthService) {

    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
      this.username = this.authService.getUsername();
      this.userRole = this.authService.extractUserRole();
      console.log('username',this.username);
      console.log('userRole',this.userRole);

    this.loadDoctors();
  }

  loadDoctors() {
    // this.isLoading = true;
    // this.doctorService.getAllDoctors().subscribe({
    //   next: (res) => {
    //     this.doctors = res;
    //     this.isLoading = false;
    //   },
    //   error: () => this.isLoading = false
    // });
  }

  bookAppointment() {
    // if (this.appointmentForm.valid) {
    //   this.isLoading = true;
    //   this.appointmentService.bookAppointment(this.appointmentForm.value).subscribe({
    //     next: () => {
    //       this.isLoading = false;
    //       this.snackBar.open('Appointment booked successfully!', 'Close', {
    //         duration: 3000,
    //         panelClass: ['success-snackbar']
    //       });
    //       this.appointmentForm.reset();
    //     },
    //     error: () => {
    //       this.isLoading = false;
    //       this.snackBar.open('Failed to book appointment.', 'Close', {
    //         duration: 3000,
    //         panelClass: ['error-snackbar']
    //       });
    //     }
    //   });
    // }
  }
     logout(){
    this.authService.logout();
    window.location.reload(); // Reload the page to reflect the logout

   }

}

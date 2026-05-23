import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { DoctorService } from '../services/doctor.service';


@Component({
  selector: 'app-basic-details',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.css'
})
export class BasicDetailsComponent {

ngOnInit(): void {
  
}

  doctorForm!: FormGroup<any>;


selectedFileName: any;
fileError: any;


onSubmit() {
throw new Error('Method not implemented.');
}
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
fileName: any;
registerDoctor() {
throw new Error('Method not implemented.');
}
// allowOnlyNumbers(event: KeyboardEvent) {
//   const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   if (!allowedKeys.includes(event.key)) {
//     event.preventDefault();
//   }
// }

}

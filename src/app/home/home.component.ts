import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../springboot-api-services/auth.service';

import * as AOS from 'aos';
import Swiper from 'swiper';
import 'swiper/css';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private service: AuthService,
    private router: Router,
  ) {}

  appointmentCount: number = 0;
  showChat = false;

  userMessage = '';

  loading = false;

  messages: any[] = [];

  toggleChat() {
    console.log('Toggling chat. Current state:', this.showChat);
    this.showChat = !this.showChat;
    console.log('Chat toggled. New state:', this.showChat);
  }

  sendMessage() {

  if (!this.userMessage.trim()) return;

  // USER MESSAGE

  this.messages.push({

    role: 'user-msg',
    content: this.userMessage,

  });

  const question = this.userMessage;

  this.userMessage = '';

  this.loading = true;

  this.service.sendMessage(question).subscribe({

    next: (res: any) => {

      this.messages.push({

        role: 'bot-msg',
        content: res,

      });

      this.loading = false;

    },

    error: (err: any) => {

      console.error(err);

      this.messages.push({

        role: 'bot-msg',
        content: 'Server error occurred'

      });

      this.loading = false;

    },

  });

}
  // ✅ Lifecycle 1
  ngOnInit(): void {
    // Fetch stats
    this.service.getCountsofCompletedAppointments().subscribe((res) => {
      this.stats[2].value = res + '+';
    });

    this.service.getCountsOfVerifiedDoctors().subscribe((res) => {
      this.stats[0].value = res + '+';
    });

    // Init AOS
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  loginOrSignup() {
    this.router.navigate(['/login/register']);
  }

  // ✅ Lifecycle 2 (CORRECT PLACE)
  ngAfterViewInit(): void {
    new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 2500,
      },
    });
  }

  // Data
  features = [
    {
      icon: '🩺',
      title: 'Doctor Consultation',
      desc: 'Expert doctors available',
    },
    { icon: '📅', title: 'Easy Booking', desc: 'Quick appointment scheduling' },
    { icon: '🎥', title: 'Video Consultation', desc: 'Consult from home' },
    { icon: '📄', title: 'Digital Prescription', desc: 'Download anytime' },
    { icon: '💳', title: 'Secure Payments', desc: 'Safe transactions' },
    {
      icon: '📂',
      title: 'Medical Records',
      desc: 'Store health data securely',
    },
  ];

  reviews = [
    { name: 'Rahul', text: 'Excellent service! Booking was easy.' },
    { name: 'Priya', text: 'Doctor was very helpful.' },
    { name: 'Amit', text: 'Loved video consultation feature!' },
  ];

  stats = [
    { value: '0', label: 'Doctors' },
    { value: '50+', label: 'Hospitals' },
    { value: '0', label: 'Appointments' },
    { value: '95%', label: 'Satisfaction' },
  ];
}

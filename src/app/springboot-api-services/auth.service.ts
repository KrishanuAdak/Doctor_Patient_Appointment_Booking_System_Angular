import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDB } from '../models/AuthDB';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBaseUrl = environment.apiBaseUrl;

  private auth_register_url = `${this.apiBaseUrl}/auth-service/register`;
  private auth_login_url    = `${this.apiBaseUrl}/auth-service/login`;
  private auth_logout_url   = `${this.apiBaseUrl}/auth-service/logout`;
  private chat_api_url      = `${this.apiBaseUrl}/ai/ask`;

  constructor(private http: HttpClient) {}

  // ─────────────────────────────────────────
  // REGISTER
  // Spring Boot sets HttpOnly cookie in response
  // ─────────────────────────────────────────
  registerUser(data: AuthDB): Observable<any> {
    return this.http.post<any>(this.auth_register_url, data, {
      withCredentials: true  // ← receives HttpOnly cookie from Spring Boot
    });
  }

  // ─────────────────────────────────────────
  // LOGIN
  // Spring Boot validates and sets HttpOnly cookie
  // ─────────────────────────────────────────
  loginUser(data: AuthDB): Observable<any> {
    return this.http.post<any>(this.auth_login_url, data, {
      withCredentials: true  // ← receives HttpOnly cookie from Spring Boot
    });
  }

  // ─────────────────────────────────────────
  // LOGOUT
  // Calls Spring Boot to clear the HttpOnly cookie
  // Never manually clear localStorage — cookie is managed by server
  // ─────────────────────────────────────────
  logout(): Observable<any> {
    return this.http.post<any>(this.auth_logout_url, {}, {
      withCredentials: true  // ← server clears the cookie
    });
  }

  // ─────────────────────────────────────────
  // AUTH STATE
  // Since JWT is in HttpOnly cookie, we can't
  // read it in JS — call a protected endpoint to verify
  // ─────────────────────────────────────────
  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiBaseUrl}/auth-service/validate`, {
      withCredentials: true  // ← sends cookie automatically
    });
  }

  // ─────────────────────────────────────────
  // GET CURRENT USER PROFILE
  // Spring Boot reads JWT from cookie and returns user info
  // ─────────────────────────────────────────
  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/auth-service/profile`, {
      withCredentials: true
    });
  }

  // ─────────────────────────────────────────
  // DASHBOARD COUNTS (no auth needed)
  // ─────────────────────────────────────────
  getCountsofCompletedAppointments(): Observable<number> {
    return this.http.get<number>(
      'http://api.appointment-easy-bengal.in:5959/appointment/v1/appointments/count'
    );
  }

  getCountsOfVerifiedDoctors(): Observable<number> {
    return this.http.get<number>(
      'http://api.appointment-easy-bengal.in:8085/doctor/verified-doctor/counts'
    );
  }

  // ─────────────────────────────────────────
  // AI CHAT
  // ─────────────────────────────────────────
  sendMessage(message: string): Observable<string> {
    const params = new HttpParams().set('query', message);
    return this.http.get(this.chat_api_url, {
      params,
      responseType: 'text',
      withCredentials: true  // ← sends cookie if chat is protected
    });
  }
}
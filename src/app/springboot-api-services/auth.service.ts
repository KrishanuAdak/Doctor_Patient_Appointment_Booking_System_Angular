import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDB } from '../models/AuthDB';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register // Assuming roles are stored in 'roles' claim as an array
    (role: string, username: any, password: any) {
      throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { 
    this.http=http;
  }
  private auth_register_url= 'http://api.appointment-easy-bengal.in:7979/auth-service/register';

  private auth_login_url= 'http://api.appointment-easy-bengal.in:7979/auth-service/login';
  private chat_api_url = 'http://api.appointment-easy-bengal.in:7001/ai/ask';

  registerUser(data:AuthDB):Observable<any>
  { 
    return this.http.post<any>(this.auth_register_url,data);
    

  }
  getCountsofCompletedAppointments():Observable<number>{
    return this.http.get<number>('http://api.appointment-easy-bengal.in:5959/appointment/v1/appointments/count');

  }
  getCountsOfVerifiedDoctors():Observable<number>{
    return this.http.get<number>('http://api.appointment-easy-bengal.in:8085/doctor/verified-doctor/counts');
  }

  loginUser(data: AuthDB):Observable<any>{
    return this.http.post<any>(this.auth_login_url, data);
  }

    logout() {
    localStorage.removeItem('token');
  }
   getToken(): string | null {
    return localStorage.getItem('token');
  }

   isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

    getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token as string);
      // Spring Boot usually puts username/email in `sub`
      return decoded?.sub || decoded?.username || null;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  extractUserRole():string | null{
    const token = this.getToken();
    if(!token) return null;
      const decoded: any = jwtDecode(token as string);
      // Assuming roles are stored in 'roles' claim as an array
      const roles = decoded?.roles;
          return decoded?.role || decoded?.roles || null; // backend may use 'role' or 'roles'

      
  }
  sendMessage(message: string) {
  const params = new HttpParams().set('query', message);
  return this.http.get(this.chat_api_url, { 
    params,
    responseType: 'text'  // ← ADD THIS
  });
}


  

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDB } from '../models/AuthDB';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 
    this.http=http;
  }
  private auth_register_url= 'http://localhost:7979/auth-service/register';

  private auth_login_url= 'http://localhost:7979/auth-service/login';

  registerUser(data:AuthDB):Observable<any>
  { 
    return this.http.post<any>(this.auth_register_url,data);
    

  }

  loginUser(data:AuthDB):Observable<any>{
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
}

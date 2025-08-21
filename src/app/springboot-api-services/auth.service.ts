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

  registerUser(data:AuthDB):Observable<any>
  { 
    return this.http.post<any>(this.auth_register_url,data);
    

  }
}

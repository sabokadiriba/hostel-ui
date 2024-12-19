import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(formData: any) {
    return this.http.post(`${this.baseURL}/signup`, formData);
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

   // Parse the JWT token and return the claims payload
   getClaims() {
    const token = this.getToken();
    if (!token) return null; // If no token, return null
    const claims = JSON.parse(window.atob(token.split('.')[1])); // Decode token and get claims
    return claims;
  }
}

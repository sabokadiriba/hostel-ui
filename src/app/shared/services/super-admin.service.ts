import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
 private baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) {}
  getAllHostels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hostel`);
  }
  createHostel(newHostel: { hostelName: string; address: string; contactNumber: string; }): Observable<any> {
    return this.http.post(`${this.baseUrl}/hostel`, newHostel);
  }
  getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Account/GetAllAdmins`);
  }

  registerAdmin(adminData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Account/RegisterAdmin`, adminData);
  }
  getAllSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Subscription`);
  }

  createSubscription(subscriptionData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Subscription`, subscriptionData);
  }
  updateSubscription(id: number, subscription: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Subscription/${id}`, subscription);
  }
}

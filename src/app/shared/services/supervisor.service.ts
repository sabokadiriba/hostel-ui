import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {


   // Fetch room details by room ID
   getRoomById(roomId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/room/${roomId}`);
  }



  // Save the booking (room allocation)
  bookRoom(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/room/Allocate`, bookingData);
  }

   

  getAllCustomer(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Customer`);
  }
  createCustomer(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Customer`, formData);
  }
  updateCustomer(customerId: number, formData: FormData) {
    return this.http.put(`${this.baseUrl}/${customerId}`, formData);
  }
  deleteCustomer(customerId: number) {
    return this.http.delete(`${this.baseUrl}/Customer/${customerId}`);
  }

  
  getFeeDueByCustomerId(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/room/getFeeDueByCustomerId/${customerId}`);
  }
  // Clear fee for a room
  clearFee(customerId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/room/clearFee/${customerId}`, {});
  }

  // Discharge a room
  relieveCustomer(customerId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/room/relieve/${customerId}`, {});
  }


  calculateFee(customerId: number, roomId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/FeeCollection/calculate/${customerId}/${roomId}`);
  }
  recordPayment(payment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/FeeCollection/record-payment`, payment);
  }
  private baseUrl = environment.apiUrl; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}
  
}

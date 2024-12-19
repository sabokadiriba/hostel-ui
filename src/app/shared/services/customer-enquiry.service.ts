import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerEnquiryService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Submit inquiry to the backend API
  submitInquiry(inquiryData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CustomerInquiries`,inquiryData);
  }
   // Fetch inquiries
   getInquiries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CustomerInquiries`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Make sure to have your API endpoint here

@Injectable({
  providedIn: 'root',
})
export class HostelSubscriptionService {
  private baseUrl = environment.apiUrl;
  private subscriptionStatusUrl = `${this.baseUrl}/hostel/subscription-status`;
  
  constructor(private http: HttpClient) {}

  // Check if the hostel's subscription is active
  checkSubscriptionStatus(): Observable<{ isActive: boolean }> {
    return this.http.get<{ isActive: boolean }>(this.subscriptionStatusUrl);
  }

  // Remove token from local storage
  handleSessionExpiration(): void {
    localStorage.removeItem('token');
    alert("Your hostel's subscription is inactive. Please contact the admin.");
    window.location.href = "/authentication/login"; // Redirect to login page
  }

  // Periodically check the subscription status
  startSubscriptionCheck(): void {
    setInterval(() => {
      this.checkSubscriptionStatus().subscribe(
        (response) => {
          if (!response.isActive) {
            this.handleSessionExpiration();
          }
        },
        (error) => {
          console.error('Error checking subscription status:', error);
        }
      );
    }, 60000); // Check every 60 seconds
  }
}

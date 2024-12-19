import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
  getRoomById(roomId: number) {
    throw new Error('Method not implemented.');
  }
  registerSupervisor(newSupervisor: any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Account/RegisterSupervisor`, newSupervisor);
  }
  getAllSupervisors():Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Account/GetAllSupervisors`);
  } 
  getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Account/GetAllAdmins`);
  }
  getAllHostels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/hostel`);
  }


  // Block Management
  getAllBlocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/block`);
  }

 
  // Room Management
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/room`);
  }

  addRoom(room: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/room`, room);
  }
  createBlock(newBlock: { hostelId: number, blockNumber: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/block`, newBlock);
  }
   // SMS Settings
   // SMS Configuration Methods
   getSmsConfigurations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sms/configuration`);
  }

  updateSmsConfiguration(moduleName: string, isSmsEnabled: boolean): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/sms/configuration`, { moduleName, isSmsEnabled });
  }
  private baseUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) {}
 
  
  
}

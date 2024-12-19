import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { SupervisorService } from 'src/app/shared/services/supervisor.service';

@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss'],
})
export class RoomManagementComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  rooms: any[] = [];
  filteredRooms: any[] = [];
  filterText: string = '';
 
  selectedRoom: any = null; // Store the room details for discharge
  feeCleared: boolean = false; // Track if the fee is cleared
  isPaid: boolean =false;
  showBookRoomModal: boolean =false;
  customers: any[] = [];
  selectedCustomerId: number | null = null;
  startDate: string | null = null;
  selectedBookType: string|null=null;
  constructor(private adminService: AdminService,
    private superviserService: SupervisorService,
     private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadCustomers()
    setTimeout(() => {
      this.message = null;
      this.messageType = null;
    }, 500);
  }

  loadRooms(): void {
    this.adminService.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.filteredRooms = this.rooms;
    });
  }
  loadCustomers(): void {
    this.superviserService.getAllCustomer().subscribe((data) => {
      this.customers = data;
     
    });
  }
  
  
  filterRooms(): void {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredRooms = this.rooms.filter(
      (room) =>
        room.roomNumber.toLowerCase().includes(lowerCaseFilter) ||
        room.floor.toString().includes(lowerCaseFilter) ||
        room.capacity.toString().includes(lowerCaseFilter)
    );
  }

  openBookingModal(room: any) {
  this.selectedRoom = room;
  this.showBookRoomModal = true;
}

closeBookRoomModal() {

this.showBookRoomModal = false;
this.selectedRoom=null;
 this.selectedCustomerId= null;
  this.startDate = null;
  this.selectedBookType=null;
}
bookRoom(): void {
  if (!this.selectedRoom || !this.selectedCustomerId || !this.startDate) {
    console.error('Booking data is incomplete. Please check inputs.');
    return;
  }

  // Consolidate all data into a single object
  const bookingData = {
    roomId: this.selectedRoom.roomId, // Current room ID
    customerId: this.selectedCustomerId, // Customer selected in modal
    bookType:this.selectedBookType,
    startDate: this.startDate, // Start date entered in modal
    };

  console.log('Booking Data:', bookingData);

  // Call the API with the consolidated data
  this.superviserService.bookRoom(bookingData).subscribe(
    () => {
      
      this.message = 'Room discharged successfully!';
      this.messageType = 'success';
      this.loadRooms()
      this.closeBookRoomModal(); // Close the modal on success
      
      
    },
    (error) => {
      console.error('Failed to book room:', error);
      this.closeBookRoomModal(); 
    
    }
  );
}

  

  


}

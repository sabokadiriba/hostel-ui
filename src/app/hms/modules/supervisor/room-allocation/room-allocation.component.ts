import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupervisorService } from 'src/app/shared/services/supervisor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-allocation',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule ],
  templateUrl: './room-allocation.component.html',
  styleUrls: ['./room-allocation.component.scss'],
})
export class RoomAllocationComponent implements OnInit {
  roomId: number = 0;
  selectedRoom: any = null;
  customers: any[] = [];
  bookingForm!: FormGroup;
  bookingData = {
    totalAmount: 0,
    dueFee: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private supervisorService: SupervisorService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.paramMap.get('roomId')!;
    this.initializeForm();
    this.loadRoomData();
    this.loadCustomers();

  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      roomId: [this.roomId, Validators.required],
      customerId: [null, Validators.required],
      bookingType: ['Daily', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      amountPaid: [0, [Validators.required, Validators.min(0)]],
    });
  }

  loadRoomData(): void {
    this.supervisorService.getRoomById(this.roomId).subscribe((room) => {
      this.selectedRoom = room;
    });
  }

  loadCustomers(): void {
    this.supervisorService.getAllCustomer().subscribe((data: any) => {
      this.customers = data;
    });
  }

  calculateAmount(): void {
    const startDate = new Date(this.bookingForm.get('startDate')?.value);
    const endDate = new Date(this.bookingForm.get('endDate')?.value);
    const bookingType = this.bookingForm.get('bookingType')?.value;

    if (startDate && endDate && this.selectedRoom) {
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

      if (duration > 0) {
        if (bookingType === 'Daily') {
          this.bookingData.totalAmount = duration * this.selectedRoom.dailyFee;
        } else if (bookingType === 'Monthly') {
          const months = duration / 30;
          this.bookingData.totalAmount = months * this.selectedRoom.monthlyFee;
        }
      }

      const amountPaid = this.bookingForm.get('amountPaid')?.value || 0;
      this.bookingData.dueFee = this.bookingData.totalAmount - amountPaid;
    }
  }

  saveBooking(): void {
    const formValue = this.bookingForm.value;
  
    // Consolidate all data into a single object
    const bookingData = {
      roomId: this.roomId, // Current room ID
      customerId: formValue.customerId,
      amountPaid: formValue.amountPaid,
      dueFee: this.bookingData.dueFee,
      endDate: formValue.endDate,
      
      paymentMethod: 'Cash', // Fixed for now
      receiptNumber: `R${new Date().getTime()}`,
      paymentDate: new Date(),
      isPartialPayment: this.bookingData.dueFee > 0, // Flag for partial payment
      isPaid: this.bookingData.dueFee === 0 // Flag for fully paid
    };
  
    console.log(bookingData)
    // Call the API with the consolidated data
    this.supervisorService.bookRoom(bookingData).subscribe(
      () => {
        this.router.navigate(['sv/room-management'], {
          state: { 
            message: 'Room booked successfully!', 
            messageType: 'success' 
          }
        });
        
      },
      (error) => {
        console.error('Failed to book room:', error);
        this.router.navigate(['sv/room-management'], {
          state: { 
            message: 'Failed to book room.', 
            messageType: 'error' 
          }
        });
      }
    );
  }
  
}

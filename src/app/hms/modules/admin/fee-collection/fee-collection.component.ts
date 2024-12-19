import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupervisorService } from 'src/app/shared/services/supervisor.service';

@Component({
  selector: 'app-fee-collection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fee-collection.component.html',
  styleUrls: ['./fee-collection.component.scss']
})
export class FeeCollectionComponent implements OnInit {
  customers = [];
  filteredCustomers = [];
  filterText = '';
  message = '';
  messageType = '';
  selectedCustomer: any;
  selectedRoom: any;
  selectedCustomerId: any;
  showFeeModal: boolean;
  paymentAmount: number;
  paymentError: string | null = null;

  // Inject SupervisorService into the constructor
  constructor(
    private http: HttpClient,
    private supervisorService: SupervisorService // Add this line
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.supervisorService.getAllCustomer().subscribe((data: any) => {
      this.customers = data;
      this.filteredCustomers = data;
    });
  }

  filterCustomers() {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.phoneNumber.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

openFeeModal(customer: any): void {
  this.selectedCustomer = customer;
  this.showFeeModal = true;
  
  // Fetch fee details from the server
  this.supervisorService.calculateFee(customer.customerId, customer.roomId).subscribe(
    (feeDetails) => {
      this.selectedCustomer.dueAmount = feeDetails.dueAmount;
      this.selectedCustomer.nextDueDate=feeDetails.nextDueDate
      console.log(feeDetails);
    },
    (error) => {
      console.error('Error fetching fee details:', error);
    }
  );
}

closeFeeModal(): void {
  this.showFeeModal = false;
  this.paymentAmount = 0;
}
 // Validate payment amount
 validatePayment() {
  if (this.paymentAmount == null || this.paymentAmount <= 0) {
    this.paymentError = "Payment amount must be greater than zero.";
  } else if (this.paymentAmount > this.selectedCustomer?.totalFee) {
    this.paymentError = `Payment amount cannot exceed the due fee of ${this.selectedCustomer?.totalFee}.`;
  } else {
    this.paymentError = null;
  }
}
recordPayment(customerId: number): void {
  const payment = {
    customerId,
    roomId:this.selectedCustomer.roomId,
    amountPaid: this.paymentAmount,
    dueAmount:this.selectedCustomer.dueAmount,

  };

  this.supervisorService.recordPayment(payment).subscribe(
    (response) => {
      alert('Payment recorded successfully!');
      this.closeFeeModal();
    },
    (error) => {
      console.error('Error recording payment:', error);
    }
  );
}
}
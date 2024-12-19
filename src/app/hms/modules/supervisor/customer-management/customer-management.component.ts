import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupervisorService } from 'src/app/shared/services/supervisor.service';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  customers = [];
  filteredCustomers = [];
  customerDto: any = {};
  filterText = '';
  showModal = false;
  editMode = false;
  message = '';
  messageType = '';
  deleteCustomerId: number | null = null; // Stores the ID of the customer to delete
  showDeleteModal: boolean = false; // Controls the visibility of the confirmation modal
  selectedCustomer: any;
  selectedRoom: any;
  showDischargeModal: boolean;
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
      customer.name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  openAddModal() {
    this.customerDto = {};
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(customer: any) {
    this.customerDto = { ...customer };
    this.editMode = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  saveCustomer() {
    const formData = new FormData();
    for (const key in this.customerDto) {
      formData.append(key, this.customerDto[key]);
    }
    this.supervisorService.createCustomer(formData).subscribe(
      () => {
        this.message = 'Customer saved successfully.';
        this.messageType = 'success';
        this.loadCustomers();
        this.closeModal();
      },
      error => {
        this.message = 'Error saving customer.';
        this.messageType = 'error';
      }
    );
  }
  closeDeleteModal() {
    this.deleteCustomerId = null; // Clear the stored ID
    this.showDeleteModal = false; // Hide the confirmation modal
  }
  
  confirmDelete(customerId: number) {
    this.deleteCustomerId = customerId; // Store the customer ID to be deleted
    this.showDeleteModal = true; // Show the confirmation modal
  }
  
  deleteCustomer() {
    if (!this.deleteCustomerId) return;
  
    this.supervisorService.deleteCustomer(this.deleteCustomerId).subscribe(
      () => {
        this.message = 'Customer deleted successfully.';
        this.messageType = 'success';
        this.loadCustomers();
        this.closeDeleteModal(); // Close the modal after deletion
      },
      error => {
        this.message = 'Error deleting customer.';
        this.messageType = 'error';
      }
    );
  }
  onFileSelect(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.customerDto[field] = file;
    }
  }

 
  openDischargeModal(customer: any): void {
    this.selectedCustomer = customer;
    this.selectedCustomerId = customer.customerId
    
  // Fetch fee details from the server
  this.supervisorService.calculateFee(this.selectedCustomer.customerId, this.selectedCustomer.roomId).subscribe(
    (feeDetails) => {
     
      this.selectedCustomer.feeDue = feeDetails.dueAmount;
      this.selectedCustomer.customerName = this.selectedCustomer.name; // Optional for display
    },
    (error) => {
      console.error('Error fetching fee details:', error);
    }
  );
  
  
    this.showDischargeModal = true;
  }
  

closeDischargeModal(): void {
  this.showDischargeModal = false;
  this.selectedCustomer = null;
}

relieveCustomer(): void {
  if (this.selectedCustomer) {
    this.supervisorService.relieveCustomer(this.selectedCustomerId).subscribe(
      () => {
        this.message = 'Customer relieved successfully!';
        this.messageType = 'success';
        this.loadCustomers(); // Reload the rooms to update the UI
        this.closeDischargeModal();
      },
      (error) => {
        // Display specific error messages from the API response
        this.message = error?.error?.message || 'Failed to relieve the customer.';
        this.messageType = 'error';
      }
    );
  } else {
    this.message = 'Please clear the fee before relieving the customer.';
    this.messageType = 'error';
  }
}


openFeeModal(customer: any): void {
  this.selectedCustomer = customer;
  this.showFeeModal = true;
 
  // Fetch fee details from the server
  this.supervisorService.calculateFee(customer.customerId, customer.roomId).subscribe(
    (feeDetails) => {
      this.selectedCustomer.totalFee = feeDetails.dueAmount;
      this.selectedCustomer.nextDueDate=feeDetails.nextDueDate
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
    dueAmount:0.0,

  };
 console.log(payment)
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
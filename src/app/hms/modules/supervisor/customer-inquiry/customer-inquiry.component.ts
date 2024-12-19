import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerEnquiryService } from 'src/app/shared/services/customer-enquiry.service';



@Component({
  selector: 'app-customer-inquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-inquiry.component.html',
  styleUrls: ['./customer-inquiry.component.scss'],
})
export class CustomerInquiryComponent implements OnInit {
  inquiries: any[] = [];
  filteredInquiries: any[] = [];
  filterText = '';

  newInquiry = {
    Name: '',
    PhoneNumber: '',
    Purpose: '',
    Remarks: ''
  };

  message: string = '';
  messageType: string = '';
  showAddModal = false;

  constructor(private customerEnquiryService: CustomerEnquiryService) {}

  ngOnInit(): void {
    this.loadInquiries();
  }

  loadInquiries(): void {
    this.customerEnquiryService.getInquiries().subscribe(
      (data: any[]) => {
        // Sort inquiries by the latest inquiryDate (descending order)
        this.inquiries = data.sort((a, b) => 
          new Date(b.inquiryDate).getTime() - new Date(a.inquiryDate).getTime()
        );
        this.filteredInquiries = this.inquiries; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching inquiries:', error);
      }
    );
  }

  // Submit new inquiry
  submitInquiry(): void {
    this.customerEnquiryService.submitInquiry(this.newInquiry).subscribe(
      () => {
        this.message = 'Inquiry submitted successfully!';
        this.messageType = 'success';
        this.loadInquiries(); // Reload inquiries to include new submission
        this.closeAddModal();
      },
      (error) => {
        this.message = 'Error submitting inquiry.';
        this.messageType = 'error';
        console.error('Error submitting inquiry:', error);
      }
    );
  }

  // Search/filter inquiries
  filterInquiries(): void {
    const lowerCaseFilter = this.filterText.toLowerCase();

    // Filter inquiries based on name, purpose, or phone number
    this.filteredInquiries = this.inquiries.filter((inquiry) =>
      inquiry.name.toLowerCase().includes(lowerCaseFilter) ||
      inquiry.purpose.toLowerCase().includes(lowerCaseFilter) ||
      inquiry.phoneNumber.includes(lowerCaseFilter)
    );
  }

  // Show modal to add new inquiry
  openAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.newInquiry = { Name: '', PhoneNumber: '', Purpose: '', Remarks: '' }; // Reset form
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperAdminService } from 'src/app/shared/services/super-admin.service';

@Component({
  selector: 'app-register-hostel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-hostel.component.html',
  styleUrls: ['./register-hostel.component.scss'],
})
export class RegisterHostelComponent implements OnInit {
  hostels: any[] = [];
  filteredHostels: any[] = [];
  filterText: string = '';
  showCreateModal: boolean = false;
  hostelName: string = '';
  address: string = '';
  contactNumber: string = '';

  constructor(private hostelService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadHostels();
  }

  loadHostels(): void {
    this.hostelService.getAllHostels().subscribe((data) => {
      this.hostels = data;
      this.filteredHostels = [...this.hostels];
    });
  }

  filterHostels(): void {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredHostels = this.hostels.filter(
      (hostel) =>
        hostel.hostelName.toLowerCase().includes(lowerCaseFilter) ||
        hostel.address.toLowerCase().includes(lowerCaseFilter) ||
        hostel.contactNumber.includes(lowerCaseFilter)
    );
  }

  openCreateModal(): void {
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.hostelName = '';
    this.address = '';
    this.contactNumber = '';
  }

  createHostel(): void {
    if (this.hostelName && this.address && this.contactNumber) {
      const newHostel = {
        hostelName: this.hostelName,
        address: this.address,
        contactNumber: this.contactNumber,
      };
      this.hostelService.createHostel(newHostel).subscribe(() => {
        this.loadHostels(); // Refresh hostel list
        this.closeCreateModal(); // Reset form and close modal
      });
    } else {
      alert('Please fill out all fields.');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuperAdminService } from 'src/app/shared/services/super-admin.service';

@Component({
  selector: 'app-manage-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss'],
})
export class ManageAdminComponent implements OnInit {
  admins: any[] = []; // List of all admins
  filteredAdmins: any[] = []; // Filtered admins for display
  filterText: string = ''; // Search filter text
  showDetailModal = false; // Modal visibility
  showAddModal = false; // Add admin modal visibility
  showDeleteModal =false // delete modal
  selectedAdmin: any; // Admin selected for details
  newAdmin: any = {
    email: '',
    phoneNumber: '',
    password: '',
    hostelId: null, // Null by default until selected
  }; // New admin fields
  hostels: any[] = []; // List of available hostels

  constructor(private adminService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.loadHostels(); // Load hostels when the component initializes
  }

  loadAdmins(): void {
    this.adminService.getAllAdmins().subscribe((data) => {
      this.admins = data;
      this.filteredAdmins = this.admins; // Initialize filtered list
    });
  }

  loadHostels(): void {
    this.adminService.getAllHostels().subscribe(
      (data) => {
        this.hostels = data;  // Populate the hostels list
        console.log('Loaded hostels:', this.hostels); // Log hostels to verify
      },
      (error) => {
        console.error('Error loading hostels:', error);  // Handle error
      }
    );
  }

  filterAdmins() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredAdmins = this.admins.filter(
      (admin) =>
        admin.email.toLowerCase().includes(lowerCaseFilter) ||
        admin.phoneNumber.toLowerCase().includes(lowerCaseFilter)
    );
  }

  addAdmin() {
    console.log(this.newAdmin)
    this.adminService.registerAdmin(this.newAdmin).subscribe(
      (response) => {
        this.admins.push(response); // Add new admin to the list
        this.filteredAdmins = this.admins; // Update filtered list
        this.showAddModal = false; // Close modal
        this.newAdmin = { email: '', phoneNumber: '', password: '', hostelId: null }; // Reset form
        this.loadAdmins();
      },
      (error) => {
        console.error('Error adding admin:', error);
      }
    );
  }

  openDetailModal(admin: any) {
    this.selectedAdmin = admin;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedAdmin = null;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }
  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }
}

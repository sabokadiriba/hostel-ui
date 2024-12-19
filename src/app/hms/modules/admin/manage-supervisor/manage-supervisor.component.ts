import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { SuperAdminService } from 'src/app/shared/services/super-admin.service';

@Component({
  selector: 'app-manage-supervisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-supervisor.component.html',
  styleUrls: ['./manage-supervisor.component.scss'],
})
export class ManageSupervisorComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  supervisors: any[] = []; // List of all supervisors
  filteredSupervisors: any[] = []; // Filtered supervisors for display
  filterText: string = ''; // Search filter text
  showDetailModal = false; // Modal visibility
  showAddModal = false; // Add supervisor modal visibility
  selectedSupervisor: any; // Supervisor selected for details
  newSupervisor: any = {
    email: '',
    phoneNumber: '',
    password: '',
   
  }; // New supervisor fields
 
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSupervisors();
     }

  loadSupervisors(): void {
    this.adminService.getAllSupervisors().subscribe((data) => {
      this.supervisors = data;
      this.filteredSupervisors = this.supervisors; // Initialize filtered list
    });
  }


  filterSupervisors() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredSupervisors = this.supervisors.filter(
      (supervisor) =>
        supervisor.email.toLowerCase().includes(lowerCaseFilter) ||
        supervisor.phoneNumber.toLowerCase().includes(lowerCaseFilter)
    );
  }

  addSupervisor() {
    this.message = null; // Reset the message
    this.messageType = null; // Reset the message type
   console.log(this.newSupervisor)
    this.adminService.registerSupervisor(this.newSupervisor).subscribe({
      next: (res: any) => {
        // Assuming the backend sends a success message
        this.message = res.message || 'Supervisor added successfully.';
        this.messageType = 'success';
        this.closeAddModal();
       this.loadSupervisors()
      },
      error: (err) => {
        // Extract error message from backend response
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Failed to add supervisor. Please try again.';
        }
        this.messageType = 'error';
        this.closeAddModal();
      }
    });
  }
  

  openDetailModal(supervisor: any) {
    this.selectedSupervisor = supervisor;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedSupervisor = null;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuperAdminService } from 'src/app/shared/services/super-admin.service';

@Component({
  selector: 'app-manage-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.scss'],
})
export class ManageSubscriptionComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  subscriptions: any[] = [];
  filteredSubscriptions: any[] = [];
  hostels: any[] = [];
  filterText: string = '';
  showModal = false;
  isEditMode = false; // Add or Edit mode flag
  selectedSubscription: any = null; // Holds subscription being edited
  newSubscription: any = {
    hostelId: null,
    subscriptionType: '',
    startDate: '',
    endDate: '',
    isActive: true,
  };

  constructor(
    private subscriptionService: SuperAdminService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
    this.loadHostels();
  }

  // Load all subscriptions
  loadSubscriptions(): void {
    this.subscriptionService.getAllSubscriptions().subscribe((data) => {
      this.subscriptions = data;
      this.filteredSubscriptions = this.subscriptions;
    });
  }

  // Load all hostels
  loadHostels(): void {
    this.subscriptionService.getAllHostels().subscribe((data) => {
      this.hostels = data;
    });
  }

  // Filter subscriptions based on search text
  filterSubscriptions() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredSubscriptions = this.subscriptions.filter(
      (subscription) =>
        subscription.hostelName?.toLowerCase().includes(lowerCaseFilter) ||
        subscription.subscriptionType?.toLowerCase().includes(lowerCaseFilter)
    );
  }

  addSubscription() {
    this.message = null; // Reset the message
    this.messageType = null; // Reset the message type
  
    this.subscriptionService.createSubscription(this.newSubscription).subscribe({
      next: (res: any) => {
        // Assuming the backend sends a success message
        this.message = res.message || 'Subscription added successfully.';
        this.messageType = 'success';
        this.subscriptions.push(res);
        this.filteredSubscriptions = this.subscriptions;
        this.closeModal();
      },
      error: (err) => {
        // Extract error message from backend response
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Failed to add subscription. Please try again.';
        }
        this.messageType = 'error';
        console.error('Error adding subscription:', err);
        this.closeModal(); // Optional: Close the modal even on error
      }
    });
  }

  // Update (Renew) an existing subscription
  updateSubscription() {
    this.message = null; // Reset the message
    this.messageType = null; // Reset the message type
  
    this.subscriptionService.updateSubscription(this.selectedSubscription.subscriptionId, this.newSubscription).subscribe({
      next: (res: any) => {
        // Assuming the backend sends a success message
        this.message = res.message || 'Subscription updated successfully.';
        this.messageType = 'success';
        
        // Find the updated subscription and replace it in the list
        const index = this.subscriptions.findIndex((s) => s.id === this.selectedSubscription.id);
        if (index > -1) {
          this.subscriptions[index] = res;
          this.filteredSubscriptions = this.subscriptions;
        }
        this.closeModal(); // Close the modal after success
      },
      error: (err) => {
        // Extract error message from backend response
        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Failed to update subscription. Please try again.';
        }
        this.messageType = 'error';
        console.error('Error updating subscription:', err);
        this.closeModal(); // Optional: Close the modal even on error
      }
    });
  }
  
  

  // Open modal for adding a subscription
  openAddModal() {
    this.resetNewSubscription();
    this.isEditMode = false;
    this.showModal = true;
  }

  // Open modal for updating a subscription
  openEditModal(subscription: any) {
    this.selectedSubscription = subscription;
    this.newSubscription = { ...subscription }; // Pre-fill modal with subscription data
    this.isEditMode = true;
    this.showModal = true;
  }

  // Close modal and reset form
  closeModal() {
    this.showModal = false;
    this.resetNewSubscription();
    this.loadSubscriptions()
  }

  // Reset new subscription data
  resetNewSubscription() {
    this.newSubscription = {
      hostelId: null,
      subscriptionType: '',
      startDate: '',
      endDate: '',
      isActive: true,
    };
    this.selectedSubscription = null;
  }
}

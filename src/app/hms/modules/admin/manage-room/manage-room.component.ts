
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';
import { SuperAdminService } from 'src/app/shared/services/super-admin.service';

@Component({
  selector: 'app-manage-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss'],
})
export class ManageRoomComponent implements OnInit {
  message: string | null = null;
  messageType: 'success' | 'error' | null = null;
  rooms: any[] = []; // List of all rooms
  filteredRooms: any[] = []; // Filtered rooms for display
  filterText: string = ''; // Search filter text
  showDetailModal = false; // Modal visibility
  showAddModal = false; // Add room modal visibility
  selectedRoom: any; // Room selected for details
  newRoom: any = {
    roomNumber: '',
    floor: null,
    capacity: null,
    monthlyFee: null,
    dailyFee: null,
    blockId: null, // Block ID selected by the user
  }; // New room fields
  blocks: any[] = []; // List of available blocks
  newBlock: any = { blockNumber: '',}; // New block fields
  showAddBlockModal: boolean = false;
  hostels: any[];
 
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadRooms();
    this.loadHostels();
    this.loadBlocks();
    
  }

  loadRooms(): void {
    this.adminService.getAllRooms().subscribe((data) => {
      this.rooms = data;
      this.filteredRooms = this.rooms; // Initialize filtered list
    });
  }

  loadBlocks(): void {
    this.adminService.getAllBlocks().subscribe(
      (data) => {
        this.blocks = data;  // Populate the blocks list
        console.log('Loaded blocks:', this.blocks); // Log blocks to verify
      },
      (error) => {
        console.error('Error loading blocks:', error);  // Handle error
      }
    );
  }

  filterRooms() {
    const lowerCaseFilter = this.filterText.toLowerCase();
    this.filteredRooms = this.rooms.filter(
      (room) =>
        room.roomNumber.toLowerCase().includes(lowerCaseFilter) ||
        room.floor.toString().includes(lowerCaseFilter)
    );
  }

  addRoom() {
    this.adminService.addRoom(this.newRoom).subscribe(
      (response) => {
        this.rooms.push(response); // Add new room to the list
        this.filteredRooms = this.rooms; // Update filtered list
        this.showAddModal = false; // Close modal
        this.newRoom = { roomNumber: '', floor: null, capacity: null, monthlyFee: null, dailyFee: null, blockId: null }; // Reset form
        this.loadRooms()
      },
      (error) => {
        console.error('Error adding room:', error);
      }
    );
  }

  openDetailModal(room: any) {
    this.selectedRoom = room;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedRoom = null;
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  openAddBlockModal() {
    this.showAddBlockModal = true;
  }

  closeAddBlockModal() {
    this.showAddBlockModal = false;
  }
  loadHostels() {
    this.adminService.getAllHostels().subscribe(
      (data) => {
        this.hostels = data; // Store hostels in the array
      },
      (error) => {
        this.message = 'Error fetching hostels: ' + error.message;
        this.messageType = 'error';
      }
    );
  }
  addBlock() {
    if (this.newBlock.blockNumber) {
      this.adminService.createBlock(this.newBlock).subscribe(
        (response) => {
          this.message = 'Block added successfully!';
          this.messageType = 'success';
          this.loadBlocks()
          this.closeAddBlockModal();
        },
        (error) => {
          this.message = 'Error adding block: ' + error.message;
          this.messageType = 'error';
          this.closeAddBlockModal()
        }
      );
    } else {
      this.message = 'Please fill in all fields.';
      this.messageType = 'error';
    }
  }}
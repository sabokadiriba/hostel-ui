import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-sms-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sms-settings.component.html',
  styleUrl: './sms-settings.component.scss'
})
export class SmsSettingsComponent implements OnInit {
  smsConfigurations: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadSmsConfigurations();
  }

  loadSmsConfigurations(): void {
    this.adminService.getSmsConfigurations().subscribe({
      next: (configurations) => {
        this.smsConfigurations = configurations;
      },
      error: () => {
        alert('Failed to load SMS configurations.');
      }
    });
  }

  toggleSms(moduleName: string, isSmsEnabled: boolean): void {
    this.adminService.updateSmsConfiguration(moduleName, isSmsEnabled).subscribe({
      next: () => {
        alert(`SMS for ${moduleName} has been ${isSmsEnabled ? 'enabled' : 'disabled'}.`);
        this.loadSmsConfigurations(); // Reload configurations
      },
      error: () => {
        alert('Failed to update SMS configuration.');
      }
    });
  }
}
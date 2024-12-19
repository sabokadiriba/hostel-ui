// Angular Import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BajajChartComponent } from './bajaj-chart/bajaj-chart.component';
import { ChartDataMonthComponent } from './chart-data-month/chart-data-month.component';
import { claimReq } from 'src/app/shared/utils/ClaimReq-utils';
import { HideIfClaimsNotMetDirective } from 'src/app/directives/hide-if-claims-not-met.directive';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, SharedModule, BajajChartComponent, BarChartComponent, ChartDataMonthComponent,HideIfClaimsNotMetDirective],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  claimReq=claimReq
  // public method
  ListGroup = [
    {
      name: 'Bajaj Finery',
      profit: '10% Profit',
      invest: '$1839.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'TTML',
      profit: '10% Loss',
      invest: '$100.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Reliance',
      profit: '10% Profit',
      invest: '$200.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success'
    },
    {
      name: 'ATGL',
      profit: '10% Loss',
      invest: '$189.00',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Stolon',
      profit: '10% Profit',
      invest: '$210.00',
      bgColor: 'bg-light-success',
      icon: 'ti ti-chevron-up',
      color: 'text-success',
      space: 'pb-0'
    }
  ];

  profileCard = [
    {
      style: 'bg-primary-dark text-white',
      background: 'bg-primary',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      background: 'bg-warning',
      avatar_background: 'bg-light-warning',
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-warning'
    }
  ];
  role: string = '';
  data: any = {};

  totalHostel: number = 0;
  totalAdmin:number =0;
  activeSubscription: number = 0;
  feeCollection: number = 0;
  totalDues: number = 0;
  inactiveSubscription: number;

  totalCustomer :number = 0;
 
  availableRoom: number = 0;
  bookedRoom:number = 0;

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(response => {
     this.role = response.data.role
     this.data = response.data
     console.log(this.data)
      if (this.role === 'SuperAdmin') {
      this.totalHostel = this.data.totalHostels || 0;
      this.activeSubscription = this.data.activeSubscriptions || 0;
      this.inactiveSubscription = this.data.inactiveSubscriptions || 0;
      }  else if (this.role === 'Admin') {
        // Handle User-specific data
        
        this.totalCustomer = this.data.totalCustomer || 0
        this.availableRoom = this.data.availableRoom || 0
        this.bookedRoom =this.data.bookedRoom || 0
       
       
      }else if (this.role === 'Superviser') {
        console.log("this is from Superviser dashboard", this.data.availableRoom,this.role)
      
        // Handle Supervisor-specific data
        this.availableRoom = this.data.availableRoom || 0
        this.bookedRoom =this.data.bookedRoom || 0
      }
    });
  }
}

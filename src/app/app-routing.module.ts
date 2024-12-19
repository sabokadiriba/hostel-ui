import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './shared/auth.guard';
import { claimReq} from './shared/utils/ClaimReq-utils'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate:[authGuard],
    canActivateChild:[authGuard],
    children: [
      {
        path: '',      
        redirectTo: '/home',
        pathMatch: 'full'
      },
     
      {
        path: 'home',
        loadComponent: () => import('./hms/modules/default/default.component').then((c) => c.DefaultComponent)
      },
     
      {
        path: 'sa/hostel',
        data: { claimReq: claimReq.superAdminonly },
        loadComponent: () => import('./hms/modules/super-admin/register-hostel/register-hostel.component').then((c)=>c.RegisterHostelComponent)
      },
      {
        path: 'sa/manage-admin',
        data: { claimReq: claimReq.superAdminonly },
        loadComponent: () => import('./hms/modules/super-admin/manage-admin/manage-admin.component').then((c)=>c.ManageAdminComponent)
      },
      {
        path: 'sa/manage-subscription',
        data: { claimReq: claimReq.superAdminonly },
        loadComponent: () => import('./hms/modules/super-admin/manage-subscription/manage-subscription.component').then((c)=>c.ManageSubscriptionComponent)
      },
      {
        path: 'ad/manage-supervisor',
        data: { claimReq: claimReq.adminOnly },
        loadComponent: () => import('./hms/modules/admin/manage-supervisor/manage-supervisor.component').then((c)=>c.ManageSupervisorComponent)
      },
      {
        path: 'ad/manage-room',
        data: { claimReq: claimReq.adminOnly },
        loadComponent: () => import('./hms/modules/admin/manage-room/manage-room.component').then((c)=>c.ManageRoomComponent)
      },
      {
        path: 'ad/sms/configuration',
        data: { claimReq: claimReq.adminOnly },
        loadComponent: () => import('./hms/modules/admin/sms-settings/sms-settings.component').then((c)=>c.SmsSettingsComponent)
      },
      {
        path: 'sv/manage-customer',
        data: { claimReq: claimReq.superviserOnly },
        loadComponent: () => import('./hms/modules/supervisor/customer-management/customer-management.component').then((c)=>c.CustomerManagementComponent)
      },
      {
        path: 'sv/room-management',
        data: { claimReq: claimReq.superviserOnly },
        loadComponent: () => import('./hms/modules/supervisor/room-management/room-management.component').then((c)=>c.RoomManagementComponent)
      },
      {
        path: 'sv/room-allocation/:roomId',
        data: { claimReq: claimReq.superviserAndAdmin },
        loadComponent: () => import('./hms/modules/supervisor/room-allocation/room-allocation.component').then((c)=>c.RoomAllocationComponent)
      },
      {
        path: 'sv/fee-collection',
        data: { claimReq: claimReq.superviserAndAdmin },
        loadComponent: () => import('./hms/modules/admin/fee-collection/fee-collection.component').then((c)=>c.FeeCollectionComponent)
      },
      {
        path: 'sv/customer-inquiry',
        loadComponent: () =>
          import('./hms/modules/supervisor/customer-inquiry/customer-inquiry.component').then(
            (c) => c.CustomerInquiryComponent
          )
      },

      {
        path: 'forbidden',
        loadComponent: () =>
          import('./shared/forbidden/forbidden.component').then(
            (c) => c.ForbiddenComponent
          )
      }
     
      
     
    ]
  },
 
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./hms/modules/authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
     
     
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

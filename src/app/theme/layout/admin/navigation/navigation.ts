import { Injectable } from '@angular/core';
import { claimReq } from 'src/app/shared/utils/ClaimReq-utils';
export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
  claimReq?: Function; 

}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-dashboard', 
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/home',
        icon: 'ti ti-home', 
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'content',
    title: 'Contents',
    type: 'group',
    icon: 'icon-content',
    children: [
      {
        id: 'hostel',
        title: 'Manage Hostel',
        type: 'item',
        classes: 'nav-item',
        url: '/sa/hostel',
        icon: 'ti ti-building', 
        claimReq:claimReq.superAdminonly
      },
      {
        id: 'manage-admin',
        title: 'Manage Admin',
        type: 'item',
        classes: 'nav-item',
        url: '/sa/manage-admin',
        icon: 'ti ti-user-shield',
        claimReq:claimReq.superAdminonly
      },
      {
        id: 'manage-subscription',
        title: 'Subscriptions',
        type: 'item',
        classes: 'nav-item',
        url: '/sa/manage-subscription',
        icon: 'ti ti-wallet', 
        claimReq:claimReq.superAdminonly
      },
      {
        id: 'supervisor',
        title: 'Manage Supervisor',
        type: 'item',
        classes: 'nav-item',
        url: '/ad/manage-supervisor',
        icon: 'ti ti-briefcase', 
        claimReq:claimReq.adminOnly
      },
      {
        id: 'manage-room',
        title: 'Manage Rooms',
        type: 'item',
        classes: 'nav-item',
        url: '/ad/manage-room',
        icon: 'ti ti-key', 
        claimReq:claimReq.adminOnly
      },
      {
        id: 'sms-setting-configuration',
        title: 'Sms Configuration',
        type: 'item',
        classes: 'nav-item',
        url: 'ad/sms/configuration',
        icon: 'ti ti-door',
        claimReq:claimReq.adminOnly
      },
      {
        id: 'manage-customer',
        title: 'Manage Customers',
        type: 'item',
        classes: 'nav-item',
        url: 'sv/manage-customer',
        icon: 'ti ti-users', 
        claimReq:claimReq.superviserOnly
      },
      {
        id: 'sv-manage-room',
        title: 'Manage Rooms',
        type: 'item',
        classes: 'nav-item',
        url: 'sv/room-management',
        icon: 'ti ti-key',
        claimReq:claimReq.superviserOnly
      }
      ,
      {
        id: 'sv-fee-collection',
        title: 'Collect Fee',
        type: 'item',
        classes: 'nav-item',
        url: 'sv/fee-collection',
        icon: 'ti ti-door',
        claimReq:claimReq.superviserOnly
      },
      {
        id: 'sv-customer-inquiry',
        title: 'Customer Inquiry',
        type: 'item',
        classes: 'nav-item',
        url: 'sv/customer-inquiry',
        icon: 'ti ti-briefcase',
        claimReq:claimReq.superviserOnly
      }
    ]
  }
];


@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}

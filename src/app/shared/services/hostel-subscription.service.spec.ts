import { TestBed } from '@angular/core/testing';

import { HostelSubscriptionService } from './hostel-subscription.service';

describe('HostelSubscriptionService', () => {
  let service: HostelSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostelSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

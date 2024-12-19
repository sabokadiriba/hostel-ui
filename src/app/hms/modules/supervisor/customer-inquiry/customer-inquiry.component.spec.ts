import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInquiryComponent } from './customer-inquiry.component';

describe('CustomerInquiryComponent', () => {
  let component: CustomerInquiryComponent;
  let fixture: ComponentFixture<CustomerInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInquiryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

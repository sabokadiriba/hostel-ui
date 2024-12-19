import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHostelComponent } from './register-hostel.component';

describe('RegisterHostelComponent', () => {
  let component: RegisterHostelComponent;
  let fixture: ComponentFixture<RegisterHostelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterHostelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterHostelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

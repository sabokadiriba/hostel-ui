import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupervisorComponent } from './manage-supervisor.component';

describe('ManageSupervisorComponent', () => {
  let component: ManageSupervisorComponent;
  let fixture: ComponentFixture<ManageSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

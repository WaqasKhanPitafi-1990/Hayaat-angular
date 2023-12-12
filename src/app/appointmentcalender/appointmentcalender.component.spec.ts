import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentcalenderComponent } from './appointmentcalender.component';

describe('AppointmentcalenderComponent', () => {
  let component: AppointmentcalenderComponent;
  let fixture: ComponentFixture<AppointmentcalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentcalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

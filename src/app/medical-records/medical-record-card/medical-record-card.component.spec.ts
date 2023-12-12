import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordCardComponent } from './medical-record-card.component';

describe('MedicalRecordCardComponent', () => {
  let component: MedicalRecordCardComponent;
  let fixture: ComponentFixture<MedicalRecordCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalRecordCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

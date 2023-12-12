import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteDoctorReviewComponent } from './write-doctor-review.component';

describe('WriteDoctorReviewComponent', () => {
  let component: WriteDoctorReviewComponent;
  let fixture: ComponentFixture<WriteDoctorReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteDoctorReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteDoctorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

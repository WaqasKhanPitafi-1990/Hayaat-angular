import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorprofileinfoComponent } from './doctorprofileinfo.component';

describe('DoctorprofileinfoComponent', () => {
  let component: DoctorprofileinfoComponent;
  let fixture: ComponentFixture<DoctorprofileinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorprofileinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorprofileinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsignupComponent } from './doctorsignup.component';

describe('DoctorsignupComponent', () => {
  let component: DoctorsignupComponent;
  let fixture: ComponentFixture<DoctorsignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

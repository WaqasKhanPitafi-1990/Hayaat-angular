import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinddoctorsComponent } from './finddoctors.component';

describe('FinddoctorsComponent', () => {
  let component: FinddoctorsComponent;
  let fixture: ComponentFixture<FinddoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinddoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinddoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

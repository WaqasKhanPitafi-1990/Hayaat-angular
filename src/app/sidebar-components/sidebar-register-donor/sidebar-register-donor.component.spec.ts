import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRegisterDonorComponent } from './sidebar-register-donor.component';

describe('SidebarRegisterDonorComponent', () => {
  let component: SidebarRegisterDonorComponent;
  let fixture: ComponentFixture<SidebarRegisterDonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRegisterDonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRegisterDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarEmergencyComponent } from './sidebar-emergency.component';

describe('SidebarEmergencyComponent', () => {
  let component: SidebarEmergencyComponent;
  let fixture: ComponentFixture<SidebarEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

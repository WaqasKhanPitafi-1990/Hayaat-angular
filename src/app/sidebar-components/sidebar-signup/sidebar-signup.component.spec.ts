import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSignupComponent } from './sidebar-signup.component';

describe('SidebarSignupComponent', () => {
  let component: SidebarSignupComponent;
  let fixture: ComponentFixture<SidebarSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

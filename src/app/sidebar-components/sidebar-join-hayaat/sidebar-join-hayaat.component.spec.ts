import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarJoinHayaatComponent } from './sidebar-join-hayaat.component';

describe('SidebarJoinHayaatComponent', () => {
  let component: SidebarJoinHayaatComponent;
  let fixture: ComponentFixture<SidebarJoinHayaatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarJoinHayaatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarJoinHayaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

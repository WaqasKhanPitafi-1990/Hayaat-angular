import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencymapComponent } from './emergencymap.component';

describe('EmergencymapComponent', () => {
  let component: EmergencymapComponent;
  let fixture: ComponentFixture<EmergencymapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencymapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

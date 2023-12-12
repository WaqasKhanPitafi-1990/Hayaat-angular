import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmergencyMapComponent } from './view-emergency-map.component';

describe('ViewEmergencyMapComponent', () => {
  let component: ViewEmergencyMapComponent;
  let fixture: ComponentFixture<ViewEmergencyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmergencyMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmergencyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

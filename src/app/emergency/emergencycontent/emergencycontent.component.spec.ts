import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencycontentComponent } from './emergencycontent.component';

describe('EmergencycontentComponent', () => {
  let component: EmergencycontentComponent;
  let fixture: ComponentFixture<EmergencycontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencycontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencycontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

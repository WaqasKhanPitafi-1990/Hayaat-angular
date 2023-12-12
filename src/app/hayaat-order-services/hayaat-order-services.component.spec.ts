import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HayaatOrderServicesComponent } from './hayaat-order-services.component';

describe('HayaatOrderServicesComponent', () => {
  let component: HayaatOrderServicesComponent;
  let fixture: ComponentFixture<HayaatOrderServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HayaatOrderServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HayaatOrderServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

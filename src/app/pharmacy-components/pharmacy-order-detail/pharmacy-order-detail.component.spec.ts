import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyOrderDetailComponent } from './pharmacy-order-detail.component';

describe('PharmacyOrderDetailComponent', () => {
  let component: PharmacyOrderDetailComponent;
  let fixture: ComponentFixture<PharmacyOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

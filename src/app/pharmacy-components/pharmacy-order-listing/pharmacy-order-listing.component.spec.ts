import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyOrderListingComponent } from './pharmacy-order-listing.component';

describe('PharmacyOrderListingComponent', () => {
  let component: PharmacyOrderListingComponent;
  let fixture: ComponentFixture<PharmacyOrderListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacyOrderListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

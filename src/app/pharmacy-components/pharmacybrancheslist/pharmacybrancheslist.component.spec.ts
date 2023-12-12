import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacybrancheslistComponent } from './pharmacybrancheslist.component';

describe('PharmacybrancheslistComponent', () => {
  let component: PharmacybrancheslistComponent;
  let fixture: ComponentFixture<PharmacybrancheslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacybrancheslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacybrancheslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacybranchesComponent } from './pharmacybranches.component';

describe('PharmacybranchesComponent', () => {
  let component: PharmacybranchesComponent;
  let fixture: ComponentFixture<PharmacybranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacybranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacybranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePharmacyReviewsComponent } from './write-pharmacy-reviews.component';

describe('WritePharmacyReviewsComponent', () => {
  let component: WritePharmacyReviewsComponent;
  let fixture: ComponentFixture<WritePharmacyReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePharmacyReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePharmacyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPharmacyReviewsComponent } from './read-pharmacy-reviews.component';

describe('ReadPharmacyReviewsComponent', () => {
  let component: ReadPharmacyReviewsComponent;
  let fixture: ComponentFixture<ReadPharmacyReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadPharmacyReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPharmacyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

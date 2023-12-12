import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacylistcontentComponent } from './pharmacylistcontent.component';

describe('PharmacylistcontentComponent', () => {
  let component: PharmacylistcontentComponent;
  let fixture: ComponentFixture<PharmacylistcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacylistcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacylistcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

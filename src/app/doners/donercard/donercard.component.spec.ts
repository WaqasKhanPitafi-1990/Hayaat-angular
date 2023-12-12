import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonercardComponent } from './donercard.component';

describe('DonercardComponent', () => {
  let component: DonercardComponent;
  let fixture: ComponentFixture<DonercardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonercardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

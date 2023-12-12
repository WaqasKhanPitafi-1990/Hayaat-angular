import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonerdetailComponent } from './donerdetail.component';

describe('DonerdetailComponent', () => {
  let component: DonerdetailComponent;
  let fixture: ComponentFixture<DonerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

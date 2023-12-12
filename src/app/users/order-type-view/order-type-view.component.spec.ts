import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeViewComponent } from './order-type-view.component';

describe('OrderTypeViewComponent', () => {
  let component: OrderTypeViewComponent;
  let fixture: ComponentFixture<OrderTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

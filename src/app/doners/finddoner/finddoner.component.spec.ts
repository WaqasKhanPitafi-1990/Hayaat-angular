import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinddonerComponent } from './finddoner.component';

describe('FinddonerComponent', () => {
  let component: FinddonerComponent;
  let fixture: ComponentFixture<FinddonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinddonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinddonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorfeefilterComponent } from './doctorfeefilter.component';

describe('DoctorfeefilterComponent', () => {
  let component: DoctorfeefilterComponent;
  let fixture: ComponentFixture<DoctorfeefilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorfeefilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorfeefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

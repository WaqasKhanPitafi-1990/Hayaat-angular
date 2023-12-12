import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupfilterComponent } from './bloodgroupfilter.component';

describe('BloodgroupfilterComponent', () => {
  let component: BloodgroupfilterComponent;
  let fixture: ComponentFixture<BloodgroupfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodgroupfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodgroupfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

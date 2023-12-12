import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreafilterComponent } from './areafilter.component';

describe('AreafilterComponent', () => {
  let component: AreafilterComponent;
  let fixture: ComponentFixture<AreafilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreafilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreafilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

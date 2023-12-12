import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityfilterComponent } from './cityfilter.component';

describe('CityfilterComponent', () => {
  let component: CityfilterComponent;
  let fixture: ComponentFixture<CityfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

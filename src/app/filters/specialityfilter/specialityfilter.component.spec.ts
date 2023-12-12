import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityfilterComponent } from './specialityfilter.component';

describe('SpecialityfilterComponent', () => {
  let component: SpecialityfilterComponent;
  let fixture: ComponentFixture<SpecialityfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

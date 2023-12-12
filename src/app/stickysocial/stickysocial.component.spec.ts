import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickysocialComponent } from './stickysocial.component';

describe('StickysocialComponent', () => {
  let component: StickysocialComponent;
  let fixture: ComponentFixture<StickysocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickysocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickysocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthpageComponent } from './healthpage.component';

describe('HealthpageComponent', () => {
  let component: HealthpageComponent;
  let fixture: ComponentFixture<HealthpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

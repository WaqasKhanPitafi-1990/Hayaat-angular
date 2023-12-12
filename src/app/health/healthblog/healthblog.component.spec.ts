import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthblogComponent } from './healthblog.component';

describe('HealthblogComponent', () => {
  let component: HealthblogComponent;
  let fixture: ComponentFixture<HealthblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

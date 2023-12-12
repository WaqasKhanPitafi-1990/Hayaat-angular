import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseCardComponent } from './press-release-card.component';

describe('PressReleaseCardComponent', () => {
  let component: PressReleaseCardComponent;
  let fixture: ComponentFixture<PressReleaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressReleaseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

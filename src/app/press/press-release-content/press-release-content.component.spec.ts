import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseContentComponent } from './press-release-content.component';

describe('PressReleaseContentComponent', () => {
  let component: PressReleaseContentComponent;
  let fixture: ComponentFixture<PressReleaseContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressReleaseContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

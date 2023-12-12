import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseDetailPageComponent } from './press-release-detail-page.component';

describe('PressReleaseDetailPageComponent', () => {
  let component: PressReleaseDetailPageComponent;
  let fixture: ComponentFixture<PressReleaseDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressReleaseDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseRecentPostComponent } from './press-release-recent-post.component';

describe('PressReleaseRecentPostComponent', () => {
  let component: PressReleaseRecentPostComponent;
  let fixture: ComponentFixture<PressReleaseRecentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressReleaseRecentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseRecentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressReleaseCategoriesComponent } from './press-release-categories.component';

describe('PressReleaseCategoriesComponent', () => {
  let component: PressReleaseCategoriesComponent;
  let fixture: ComponentFixture<PressReleaseCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressReleaseCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressReleaseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsocialsComponent } from './blogsocials.component';

describe('BlogsocialsComponent', () => {
  let component: BlogsocialsComponent;
  let fixture: ComponentFixture<BlogsocialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsocialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsocialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

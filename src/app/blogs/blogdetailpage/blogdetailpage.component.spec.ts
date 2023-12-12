import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdetailpageComponent } from './blogdetailpage.component';

describe('BlogdetailpageComponent', () => {
  let component: BlogdetailpageComponent;
  let fixture: ComponentFixture<BlogdetailpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogdetailpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

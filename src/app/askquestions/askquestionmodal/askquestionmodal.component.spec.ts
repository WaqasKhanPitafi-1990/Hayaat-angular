import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskquestionmodalComponent } from './askquestionmodal.component';

describe('AskquestionmodalComponent', () => {
  let component: AskquestionmodalComponent;
  let fixture: ComponentFixture<AskquestionmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskquestionmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskquestionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

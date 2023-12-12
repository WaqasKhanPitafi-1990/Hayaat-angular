import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinhayaatComponent } from './joinhayaat.component';

describe('JoinhayaatComponent', () => {
  let component: JoinhayaatComponent;
  let fixture: ComponentFixture<JoinhayaatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinhayaatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinhayaatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordImagesComponent } from './medical-record-images.component';

describe('MedicalRecordImagesComponent', () => {
  let component: MedicalRecordImagesComponent;
  let fixture: ComponentFixture<MedicalRecordImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalRecordImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecordImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

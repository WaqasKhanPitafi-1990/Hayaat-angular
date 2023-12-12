import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileinfoComponent } from './userprofileinfo.component';

describe('UserprofileinfoComponent', () => {
  let component: UserprofileinfoComponent;
  let fixture: ComponentFixture<UserprofileinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

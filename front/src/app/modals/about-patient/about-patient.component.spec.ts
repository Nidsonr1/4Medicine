import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPatientComponent } from './about-patient.component';

describe('AboutPatientComponent', () => {
  let component: AboutPatientComponent;
  let fixture: ComponentFixture<AboutPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPatientComponent]
    });
    fixture = TestBed.createComponent(AboutPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

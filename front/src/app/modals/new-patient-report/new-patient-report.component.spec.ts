import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientReportComponent } from './new-patient-report.component';

describe('NewPatientReportComponent', () => {
  let component: NewPatientReportComponent;
  let fixture: ComponentFixture<NewPatientReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPatientReportComponent]
    });
    fixture = TestBed.createComponent(NewPatientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

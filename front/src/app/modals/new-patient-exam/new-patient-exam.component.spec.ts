import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatientExamComponent } from './new-patient-exam.component';

describe('NewPatientExamComponent', () => {
  let component: NewPatientExamComponent;
  let fixture: ComponentFixture<NewPatientExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPatientExamComponent]
    });
    fixture = TestBed.createComponent(NewPatientExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

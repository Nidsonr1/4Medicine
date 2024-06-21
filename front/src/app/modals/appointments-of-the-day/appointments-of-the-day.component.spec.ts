import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsOfTheDayComponent } from './appointments-of-the-day.component';

describe('AppointmentsOfTheDayComponent', () => {
  let component: AppointmentsOfTheDayComponent;
  let fixture: ComponentFixture<AppointmentsOfTheDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsOfTheDayComponent]
    });
    fixture = TestBed.createComponent(AppointmentsOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

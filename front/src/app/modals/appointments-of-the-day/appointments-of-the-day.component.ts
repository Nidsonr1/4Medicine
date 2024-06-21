import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DailyViewConfirg } from 'src/app/components';
import {
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';

@Component({
  selector: 'app-appointments-of-the-day',
  templateUrl: './appointments-of-the-day.component.html',
  styleUrls: ['./appointments-of-the-day.component.less'],
})
export class AppointmentsOfTheDayComponent implements OnInit {
  constructor(
    private modalRef: NzModalRef,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private notification: NzNotificationService
  ) {}

  public appointmentsOfTheDay!:
    | Patient.Receive.PatientAppointments[]
    | Doctor.Receive.DoctorAppointments[];

  public dailyViewConfirg: DailyViewConfirg = {
    appointmentsOfTheDay: [],
  };

  public getInfoPatient() {
    this.dailyViewConfirg.appointmentsOfTheDay =
      this.modalRef.getContentComponent().modalRef.config.nzData;

    this.dailyViewConfirg.appointmentsOfTheDay.map((appointment) => {
      this.patientService
        .getPatientById({ patientId: appointment.patient_id })
        .subscribe(
          (patient) => {
            appointment.aboutPatient = patient;
          },
          ({ error }) => {
            this.notification.error('Error', error.message);
          }
        );
    });
  }

  public getInfoDoctor() {
    this.dailyViewConfirg.appointmentsOfTheDay =
      this.modalRef.getContentComponent().modalRef.config.nzData;

    this.dailyViewConfirg.appointmentsOfTheDay.map((appointment) => {
      this.doctorService
        .getDoctorById({ doctorId: appointment.doctor_id })
        .subscribe(
          (doctor) => {
            appointment.aboutDoctor = doctor;
          },
          ({ error }) => {
            this.notification.error('Error', error.message);
          }
        );
    });
  }

  ngOnInit(): void {
    this.getInfoPatient();
    this.getInfoDoctor();
  }
}

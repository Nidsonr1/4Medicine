import { Component, OnInit } from '@angular/core';

import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Doctor, Patient, PatientService } from 'src/app/services';

@Component({
  selector: 'app-about-patient',
  templateUrl: './about-patient.component.html',
  styleUrls: ['./about-patient.component.less'],
})
export class AboutPatientComponent implements OnInit {
  constructor(
    private modalRef: NzModalRef,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}

  public report!: Doctor.Receive.Report;
  public patient!: Patient.Receive.GetPatientById;

  public formatDate(date: string | Date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public calculateAge(dateOfBirth: string) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age === 0) {
      age = month;
      return `${age} meses`;
    } else {
      if (age === 1) {
        return `${age} ano`;
      }

      return `${age} anos`;
    }
  }

  public getInfoAboutPatient(id: string) {
    this.patientService.getPatientById({ patientId: id }).subscribe(
      (response) => {
        this.patient = response;
      },
      ({ error }) => {
        this.notificationService.error('Erro', error.message);
      }
    );
  }

  public ngOnInit(): void {
    this.report = this.modalRef.getContentComponent().modalRef.config.nzData;
    this.getInfoAboutPatient(this.report.patient.id);
  }
}

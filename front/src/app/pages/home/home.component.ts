import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DiaryViewComponentConfig } from 'src/app/components';
import {
  AppointmentsOfTheDayComponent,
  EditUserComponent,
} from 'src/app/modals';
import {
  AuthService,
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(
    private modalService: NzModalService,
    private router: Router,
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notification: NzNotificationService
  ) {}

  public typeUser = this.authService.validateUserLogged();
  public userLogged: Patient.Receive.PatientUser | Doctor.Receive.DoctorUser =
    this.authService.getUserLogged();

  public diaryViewComponentConfig: DiaryViewComponentConfig = {
    showCurrentDate: true,
    appointments: [],
  };

  isCollapsed = false;

  public modalRef!: NzModalRef;

  public openModal(nzTitle: string, nzContent: any, parameter?: any): void {
    this.modalRef = this.modalService.create({
      nzTitle,
      nzContent,
      nzFooter: null,
      nzMaskClosable: false,
      nzData: parameter,
    });

    this.modalRef.afterClose.subscribe(() => {
      this.getDiaryOfAppointment();
    });
  }

  public openModalEditUser(
    user: Doctor.Receive.DoctorUser | Patient.Receive.PatientUser
  ): void {
    this.openModal('Editar usuário:', EditUserComponent, user);
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public formatNameUser(name: string, type: '2-letters' | '2-names'): string {
    if (type === '2-letters') {
      const firstLetterOfFirtsName = name.split(' ')[0].charAt(0).toUpperCase();
      const firstLetterOfLastName = name.split(' ')[1].charAt(0).toUpperCase();

      return `${firstLetterOfFirtsName}${firstLetterOfLastName}`;
    }

    if (type === '2-names') {
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ')[1];

      return `${firstName} ${lastName}`;
    }

    return '';
  }

  public getDiaryOfAppointment() {
    if (this.typeUser === 'doctor') {
      this.doctorService.getDoctorAppointments().subscribe(
        (data) => {
          this.diaryViewComponentConfig.appointments = data;
          this.diaryViewComponentConfig.appointments.forEach((appointment) => {
            appointment.action = {
              icon: 'expand',
              tooltip: 'Mais informações',
              function: () => {
                this.openAboutAppointment(appointment);
              },
            };
          });
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }

    if (this.typeUser === 'patient') {
      this.patientService.getPatientAppointments().subscribe(
        (data) => {
          this.diaryViewComponentConfig.appointments = data;
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }
  }

  public openAboutAppointment(appointment: any): void {
    const appointmentsOfTheDay = [appointment];

    this.openModal(
      'Consulta agendada:',
      AppointmentsOfTheDayComponent,
      appointmentsOfTheDay
    );
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getDiaryOfAppointment();
  }
}

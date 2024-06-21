import { Component, OnInit } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppointmentsOfTheDayComponent } from 'src/app/modals';

import { NewAppointmentComponent } from 'src/app/modals/new-appointment/new-appointment.component';

import {
  AuthService,
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';

export interface AppointmentOfTheDay
  extends Doctor.Receive.DoctorAppointments,
    Patient.Receive.PatientAppointments {
  start_hour: string;
  end_hour: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
})
export class ScheduleComponent implements OnInit {
  constructor(
    private modalService: NzModalService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notification: NzNotificationService
  ) {}

  public modalRef!: NzModalRef;

  public userLogged = this.authService.validateUserLogged();

  public selectedDay = new Date();
  public selectedMonth = this.getNameOfMonth(new Date());

  public calendarData!:
    | Doctor.Receive.DoctorAppointments[]
    | Patient.Receive.PatientAppointments[];

  public openModal(nzTitle: string, nzContent: any, parameter?: any): void {
    this.modalRef = this.modalService.create({
      nzTitle,
      nzContent,
      nzWidth: '80%',
      nzFooter: null,
      nzMaskClosable: false,
      nzData: parameter,
    });

    this.modalRef.afterClose.subscribe(() => {
      this.getDiaryOfAppointment();
    });
  }

  public newAppointment() {
    this.openModal('Agendar nova consulta', NewAppointmentComponent);
  }

  public chengesInCalendar(event: any) {
    this.selectedDay = event;
    this.selectedMonth = this.getNameOfMonth(event);
    this.openAppointmentsOfTheDayModal(event);
  }

  public verifyIfIsToday(): boolean {
    return (
      this.selectedDay.getFullYear() === new Date().getFullYear() &&
      this.selectedDay.getMonth() === new Date().getMonth() &&
      this.selectedDay.getDate() === new Date().getDate()
    );
  }

  public changeMonth(direction: string = 'next' || 'prev' || 'current') {
    if (direction === 'next') {
      this.selectedDay = new Date(
        this.selectedDay.getFullYear(),
        this.selectedDay.getMonth() + 1,
        this.selectedDay.getDate()
      );
    }

    if (direction === 'current') {
      this.selectedDay = new Date();
    }

    if (direction === 'prev') {
      this.selectedDay = new Date(
        this.selectedDay.getFullYear(),
        this.selectedDay.getMonth() - 1,
        this.selectedDay.getDate()
      );
    }

    this.selectedMonth = this.getNameOfMonth(this.selectedDay);
  }

  public getNameOfMonth(date: Date): string {
    const month = date.getMonth();
    const monthName = new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
    }).format(new Date(2021, month));

    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }

  public formatHour(date: Date): string {
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const hourFormated = hour < 10 ? `0${hour}` : hour;
    const minutesFormated = minutes < 10 ? `0${minutes}` : minutes;

    return `${hourFormated}:${minutesFormated}`;
  }

  public formatCalendarDay(date: Date): AppointmentOfTheDay[] {
    if (!this.calendarData) {
      return [];
    }

    let appointmentsOfTheDay: AppointmentOfTheDay[] = [];

    const dateEvent = new Date(date);

    this.calendarData.map((appointment: any) => {
      const appointmentDate = new Date(appointment.start_date);

      if (
        dateEvent.getDate() === appointmentDate.getDate() &&
        dateEvent.getMonth() === appointmentDate.getMonth() &&
        dateEvent.getFullYear() === appointmentDate.getFullYear()
      ) {
        const appointmentByDay = {
          start_hour: this.formatHour(appointmentDate),
          end_hour: this.formatHour(new Date(appointment.end_date)),
          ...appointment,
        };

        appointmentsOfTheDay.push(appointmentByDay);
      }
    });

    return appointmentsOfTheDay;
  }

  public getDiaryOfAppointment() {
    if (this.userLogged === 'doctor') {
      this.doctorService.getDoctorAppointments().subscribe(
        (data) => {
          this.calendarData = data;
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }

    if (this.userLogged === 'patient') {
      this.patientService.getPatientAppointments().subscribe(
        (data) => {
          this.calendarData = data;
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }
  }

  public openAppointmentsOfTheDayModal(date: Date) {
    const appointmentsOfTheDay = this.formatCalendarDay(date);

    this.openModal(
      `Consultas do dia ${date.getDate()} de ${
        this.selectedMonth
      } de ${date.getFullYear()}`,
      AppointmentsOfTheDayComponent,
      appointmentsOfTheDay
    );
  }

  ngOnInit(): void {
    this.getDiaryOfAppointment();
  }
}

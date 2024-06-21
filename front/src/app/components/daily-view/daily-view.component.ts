import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface DailyViewConfirg {
  appointmentsOfTheDay: Appointment[] | [];
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  link: string;
  patient_id: string;
  doctor_id: string;
  aboutPatient?: Patient;
  aboutDoctor?: Doctor;
}

export interface Patient {
  name: string;
}

export interface Doctor {
  name: string;
}

export interface Hour {
  isNow: boolean;
  hour: string;
  minutes: string[];
}

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.less'],
})
export class DailyViewComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() public dailyViewConfirg!: DailyViewConfirg;

  public hoursOfTheDay!: any[];

  public getHoursOfDay(): Hour[] {
    const hoursOfTheDay: any[] = [];

    for (let hourController = 0; hourController < 24; hourController++) {
      const hour: Hour = {
        isNow: false,
        hour: `${hourController < 10 ? '0' + hourController : hourController}`,
        minutes: [],
      };

      for (
        let minuteController = 0;
        minuteController < 60;
        minuteController++
      ) {
        const minute = `${
          minuteController < 10 ? '0' + minuteController : minuteController
        }`;

        if (
          hourController === new Date().getHours() &&
          minuteController === new Date().getMinutes()
        ) {
          hour.isNow = true;
        }

        hour.minutes.push(minute);
      }

      hoursOfTheDay.push(hour);
    }

    return hoursOfTheDay;
  }

  public validateIfAppointmentIsInHour(
    hourOfTheDay: any,
    startHourOfAppointment: string,
    endHourOfAppointment: string
  ): boolean {
    const startHourOfAppointmentFormated = this.formatHour(
      startHourOfAppointment
    ).split(':')[0];

    const endHourOfAppointmentFormated =
      this.formatHour(endHourOfAppointment).split(':')[0];

    return (
      hourOfTheDay >= startHourOfAppointmentFormated &&
      hourOfTheDay <= endHourOfAppointmentFormated
    );
  }

  public formatHour(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  public getFisrtTwoNames(name: string): string {
    const names = name.split(' ');

    return `${names[0]} ${names[1]}`;
  }

  public redictToLink(link: string): void {
    this.router.navigate([link]);
  }

  ngOnInit(): void {}
}

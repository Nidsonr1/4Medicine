import { Component, Input, OnInit } from '@angular/core';

export interface Appointments {
  title: string;
  description?: string;
  start_date?: Date | string;
  end_date?: Date | string;
  link?: string;
  action?: {
    icon: string;
    tooltip: string;
    function: () => void;
  };
}

export interface DiaryViewComponentConfig {
  appointments: Appointments[] | [];
  showWeekend?: boolean;
  showCurrentDate?: boolean;
  showMondayToSunday?: boolean;
}

@Component({
  selector: 'app-diary-view',
  templateUrl: './diary-view.component.html',
  styleUrls: ['./diary-view.component.less'],
})
export class DiaryViewComponent implements OnInit {
  constructor() {}

  @Input() public diaryViewComponentConfig!: DiaryViewComponentConfig;

  public currentDate: Date = new Date();
  public datesOfTheWeek!: Date[];

  public formatDay(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date.toLocaleDateString('pt-BR', { weekday: 'short' });
  }

  public formarDate(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
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

  public checkCurrentDate(date: Date): boolean {
    return (
      date.getDate() === this.currentDate.getDate() &&
      date.getMonth() === this.currentDate.getMonth() &&
      date.getFullYear() === this.currentDate.getFullYear()
    );
  }

  public checkWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  public listDatesOfTheWeek(): Date[] {
    const dates: Date[] = [];
    const currentDate: Date = new Date();

    if (this.diaryViewComponentConfig.showMondayToSunday) {
      const dayOfTheWeek: number = currentDate.getDay();
      const monday: Date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - dayOfTheWeek + 1
      );

      for (let i = 0; i < 7; i++) {
        dates.push(
          new Date(
            monday.getFullYear(),
            monday.getMonth(),
            monday.getDate() + i
          )
        );
      }
    } else {
      for (let i = 0; i < 7; i++) {
        dates.push(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + i
          )
        );
      }
    }

    return dates;
  }

  public putAppointmentsInDate(date: Date, appointment: Appointments): boolean {
    if (typeof appointment.start_date === 'string') {
      appointment.start_date = new Date(appointment.start_date);
    }

    var validation =
      appointment.start_date?.getDate() === date.getDate() &&
      appointment.start_date?.getMonth() === date.getMonth() &&
      appointment.start_date?.getFullYear() === date.getFullYear();

    return validation;
  }

  ngOnInit(): void {
    this.datesOfTheWeek = this.listDatesOfTheWeek();
  }
}

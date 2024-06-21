import { Component } from '@angular/core';

import { NzModalRef } from 'ng-zorro-antd/modal';
import { differenceInCalendarDays, setHours } from 'date-fns';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.less'],
})
export class NewAppointmentComponent {
  constructor(
    private modalRef: NzModalRef,
    private formBuilder: NonNullableFormBuilder,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private notificationService: NzNotificationService
  ) {}

  public validateFormNewAppointment: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    dateAndHour: FormControl<string>;
    patientId: FormControl<string>;
    patientName: FormControl<string>;
    haveCall: FormControl<boolean>;
    linkCall: FormControl<string>;
  }> = this.formBuilder.group({
    title: this.formBuilder.control('', [Validators.required]),
    description: this.formBuilder.control('', [Validators.required]),
    dateAndHour: this.formBuilder.control('', [Validators.required]),
    patientId: this.formBuilder.control('', [Validators.required]),
    patientName: this.formBuilder.control(''),
    haveCall: this.formBuilder.control(false, [Validators.required]),
    linkCall: this.formBuilder.control(''),
  });

  public today = new Date();
  public timeDefaultValue = setHours(new Date(), new Date().getHours());

  public disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;

  public resultPatients!: Patient.Receive.SearchPatientByName[];

  public searchPatients(name: string = '') {
    this.validateFormNewAppointment.get('patientId')?.setValue('');
    this.patientService.searchPatientByName({ search: name }).subscribe(
      (response) => {
        this.resultPatients = response;
      },
      ({ error }) => {
        this.notificationService.error(
          'Erro ao buscar pacientes',
          error.message
        );
      }
    );
  }

  public closeModal(): void {
    this.modalRef.close();
  }

  public createNewAppointment(): void {
    const newAppointment = {
      title: this.validateFormNewAppointment.get('title')!.value,
      description: this.validateFormNewAppointment.get('description')!.value,
      startDate: this.validateFormNewAppointment.get('dateAndHour')!.value[0],
      endDate: this.validateFormNewAppointment.get('dateAndHour')!.value[1],
      patientId: this.validateFormNewAppointment.get('patientId')!.value,
      link: this.validateFormNewAppointment.get('linkCall')!.value || '',
    };

    this.doctorService.createAppointment(newAppointment).subscribe(
      () => {
        this.notificationService.success(
          'Sucesso!',
          'Consulta agendada com sucesso!'
        );
        this.modalRef.close();
      },
      ({ error }) => {
        this.notificationService.error('Erro', error.message);
      }
    );
  }
}

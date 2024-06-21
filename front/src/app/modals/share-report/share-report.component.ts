import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import {
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';

@Component({
  selector: 'app-share-report',
  templateUrl: './share-report.component.html',
  styleUrls: ['./share-report.component.less'],
})
export class ShareReportComponent implements OnInit {
  constructor(
    private modalRef: NzModalRef,
    private formBuilder: NonNullableFormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}

  public report!: Patient.Receive.Report;

  public validateFormShareReport: FormGroup<{
    doctorId: FormControl<string>;
    doctorName: FormControl<string>;
  }> = this.formBuilder.group({
    doctorId: this.formBuilder.control('', [Validators.required]),
    doctorName: this.formBuilder.control('', []),
  });

  public resultDoctors!: Doctor.Receive.SearchDoctorByName[];

  public searchDoctors(name: string = '') {
    this.validateFormShareReport.reset();

    this.doctorService.searchDoctorByName({ search: name }).subscribe(
      (response) => {
        this.resultDoctors = response;
      },
      ({ error }) => {
        this.notificationService.error('Erro', error.message);
      }
    );
  }

  public closeModal(): void {
    this.modalRef.close();
  }

  public shareReport(): void {
    this.patientService
      .shareReport({
        doctorId: this.validateFormShareReport.value.doctorId!,
        reportId: this.report.id,
      })
      .subscribe(
        () => {
          this.notificationService.success(
            'Sucesso',
            'Agora o médico tem acesso ao seu laudo'
          );
          this.modalRef.close();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }

  public ngOnInit(): void {
    this.report = this.modalRef.getContentComponent().modalRef.config.nzData;
  }
}

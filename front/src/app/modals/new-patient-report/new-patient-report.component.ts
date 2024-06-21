import { Component, OnInit } from '@angular/core';

import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef } from 'ng-zorro-antd/modal';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { DoctorService, Patient, PatientService } from 'src/app/services';

@Component({
  selector: 'app-new-patient-report',
  templateUrl: './new-patient-report.component.html',
  styleUrls: ['./new-patient-report.component.less'],
})
export class NewPatientReportComponent implements OnInit {
  constructor(
    private modalRef: NzModalRef,
    private formBuilder: NonNullableFormBuilder,
    private notificationService: NzNotificationService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  public resultPatients!: Patient.Receive.SearchPatientByName[];

  public firtsUploadPdf!: boolean;
  public selectedPdfFileList: NzUploadFile[] = [];
  public beforeUploadPdf = (file: NzUploadFile): boolean => {
    this.firtsUploadPdf = true;
    this.selectedPdfFileList = [file];
    return false;
  };

  public validateFormNewReport: FormGroup<{
    patientId: FormControl<string>;
    patientName: FormControl<string>;
    documentTitle: FormControl<string>;
  }> = this.formBuilder.group({
    patientId: this.formBuilder.control('', [Validators.required]),
    patientName: this.formBuilder.control('', []),
    documentTitle: this.formBuilder.control('', [Validators.required]),
  });

  public searchPatients(name: string = '') {
    this.validateFormNewReport.reset();
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

  public closeModal() {
    this.modalRef.close();
  }

  public sendNewReport() {
    this.doctorService
      .createNewPatientReport({
        patientId: this.validateFormNewReport.get('patientId')!.value,
        file: this.selectedPdfFileList[0],
        documentTitle: this.validateFormNewReport.get('documentTitle')!.value,
      })
      .subscribe(
        () => {
          this.notificationService.success(
            'Sucesso',
            'O laudo foi enviado com sucesso!'
          );
          this.modalRef.close();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }

  ngOnInit(): void {}
}

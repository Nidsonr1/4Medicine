import { Component, OnInit } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import {
  NewPatientReportComponent,
  AboutPatientComponent,
  ShareReportComponent,
} from 'src/app/modals';

import {
  AuthService,
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less'],
})
export class ReportsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private modalService: NzModalService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private filesService: FilesService,
    private notification: NzNotificationService
  ) {}

  public modalRef!: NzModalRef;

  public userLogged = this.authService.validateUserLogged();

  public dataTableReportsDoctors!: Doctor.Receive.Report[];
  public dataTableReportsPatients!: Patient.Receive.Report[];

  public totalItemsTable!: number;
  public limitPerPage = 10;
  public tableOffset = 0;

  public indexPageTable = 1;

  public formatArray(expertises: string[]): { label: string }[] {
    const newArray = expertises.map((expertise) => {
      return { label: expertise };
    });

    return newArray;
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

  public openModal(
    nzTitle: string,
    nzContent: any,
    parameter?: Doctor.Receive.Report | Patient.Receive.Report
  ): void {
    this.modalRef = this.modalService.create({
      nzTitle,
      nzContent,
      nzFooter: null,
      nzMaskClosable: false,
      nzData: parameter,
    });

    this.modalRef.afterClose.subscribe(() => {
      this.getTableReports();
    });
  }

  public formatDate(date: string | Date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public newReport() {
    this.openModal('Novo laudo', NewPatientReportComponent);
  }

  public aboutPatient(report: Doctor.Receive.Report) {
    this.openModal('Sobre paciente', AboutPatientComponent, report);
  }

  public openReport(report: Doctor.Receive.Report | Patient.Receive.Report) {
    const urlPdf = this.filesService.getPdfUrl(report.document);
    window.open(urlPdf, '_blank');
  }

  public shareReport(report: Patient.Receive.Report) {
    this.openModal('Compartilhar laudo', ShareReportComponent, report);
  }

  public unsharedReports(doctor: string, reportId: string) {
    this.patientService
      .unshareReport({
        doctorName: doctor,
        reportId: reportId,
      })
      .subscribe(
        () => {
          this.notification.success('Sucesso', 'Laudo descompartilhado');
          this.getTableReports();
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
  }

  public getTableReports(
    filter?: Doctor.Send.FilterTable | Patient.Send.FilterTable
  ) {
    let payload;

    if (filter) {
      payload = {
        limit: filter.limit,
        offset: filter.offset,
      };
    } else {
      payload = {
        limit: 10,
        offset: 0,
      };
    }

    if (this.userLogged === 'doctor') {
      this.doctorService.getDoctorReports(payload).subscribe(
        (data) => {
          this.dataTableReportsDoctors = data.reportsToDoctor;
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }

    if (this.userLogged === 'patient') {
      this.patientService.getPatientReports(payload).subscribe(
        (data) => {
          this.dataTableReportsPatients = data.reportsToPatient;
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }
  }

  public onCurrentPageDataChange(tableData: any): void {
    this.indexPageTable = tableData;
    this.tableOffset = Number(`${tableData}0`);

    this.getTableReports({
      limit: this.limitPerPage,
      offset: this.tableOffset - this.limitPerPage,
    });
  }

  ngOnInit(): void {
    this.getTableReports();
  }
}

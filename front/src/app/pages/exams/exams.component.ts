import { Component, OnInit } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { AboutPatientComponent } from 'src/app/modals';
import { NewPatientExamComponent } from 'src/app/modals/new-patient-exam/new-patient-exam.component';
import { ShareExamComponent } from 'src/app/modals/share-exam/share-exam.component';
import {
  AuthService,
  Doctor,
  DoctorService,
  FilesService,
  Patient,
  PatientService,
} from 'src/app/services';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.less'],
})
export class ExamsComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private filesService: FilesService,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) {}

  public modalRef!: NzModalRef;

  public userLogged = this.authService.validateUserLogged();

  public dataTableExamsDoctor!: Doctor.Receive.Exam[];
  public dataTableExamPatient!: Patient.Receive.Exam[];

  public totalItemsTable!: number;
  public limitPerPage = 10;
  public tableOffset = 0;

  public indexPageTable = 1;

  public openModal(
    nzTitle: string,
    nzContent: any,
    parameter?: Doctor.Receive.Exam | Patient.Receive.Exam
  ): void {
    this.modalRef = this.modalService.create({
      nzTitle,
      nzContent,
      nzFooter: null,
      nzMaskClosable: false,
      nzData: parameter,
    });

    this.modalRef.afterClose.subscribe(() => {
      this.getTableExams();
    });
  }

  public newExam() {
    this.openModal('Novo exame', NewPatientExamComponent);
  }

  public aboutPatient(exam: Doctor.Receive.Exam) {
    this.openModal('Sobre paciente', AboutPatientComponent, exam);
  }

  public shareExam(exam: Patient.Receive.Exam) {
    this.openModal('Compartilhar exame', ShareExamComponent, exam);
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

  public formatDate(date: string | Date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  public openExam(exam: Doctor.Receive.Exam | Patient.Receive.Exam) {
    const urlPdf = this.filesService.getPdfUrl(exam.document);
    window.open(urlPdf, '_blank');
  }

  public unsharedExam(doctor: string, examId: string) {
    this.patientService
      .unshareExam({
        doctorName: doctor,
        examId: examId,
      })
      .subscribe(
        () => {
          this.notification.success('Sucesso', 'Exame descompartilhado');
          this.getTableExams();
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
  }

  public formatArray(items: string[]): { label: string }[] {
    const newArray = items.map((item) => {
      return { label: item };
    });

    return newArray;
  }

  public getTableExams(
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
      this.doctorService.getDoctorExams(payload).subscribe(
        (data) => {
          this.totalItemsTable = data.total;
          this.dataTableExamsDoctor = data.examsToDoctor;
        },
        ({ error }) => {
          this.notification.error('Erro', error.message);
        }
      );
    }

    if (this.userLogged === 'patient') {
      this.patientService.getPatientExams(payload).subscribe(
        (data) => {
          this.totalItemsTable = data.total;
          this.dataTableExamPatient = data.examsToPatient;
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

    this.getTableExams({
      limit: this.limitPerPage,
      offset: this.tableOffset - this.limitPerPage,
    });
  }

  ngOnInit(): void {
    this.getTableExams();
  }
}

import { Component, OnInit } from '@angular/core';
import {
  Form,
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
  selector: 'app-share-exam',
  templateUrl: './share-exam.component.html',
  styleUrls: ['./share-exam.component.less'],
})
export class ShareExamComponent implements OnInit {
  constructor(
    private modalRef: NzModalRef,
    private formBuilder: NonNullableFormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}

  public exam!: Patient.Receive.Exam;

  public validateFormShareExam: FormGroup<{
    doctorId: FormControl<string>;
    doctorName: FormControl<string>;
  }> = this.formBuilder.group({
    doctorId: this.formBuilder.control('', [Validators.required]),
    doctorName: this.formBuilder.control('', []),
  });

  public resultDoctors!: Doctor.Receive.SearchDoctorByName[];

  public searchDoctors(name: string = '') {
    this.validateFormShareExam.reset();

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

  public shareExam(): void {
    this.patientService
      .shareExam({
        doctorId: this.validateFormShareExam.value.doctorId!,
        examId: this.exam.id,
      })
      .subscribe(
        (response) => {
          this.notificationService.success(
            'Sucesso',
            'Agora o médico tem acesso ao seu exame'
          );
          this.modalRef.close();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }

  ngOnInit(): void {
    this.exam = this.modalRef.getContentComponent().modalRef.config.nzData;
  }
}

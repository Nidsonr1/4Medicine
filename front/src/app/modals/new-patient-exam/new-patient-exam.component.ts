import { Component } from '@angular/core';

import { NzModalRef } from 'ng-zorro-antd/modal';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { AuthService, PatientService } from 'src/app/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-new-patient-exam',
  templateUrl: './new-patient-exam.component.html',
  styleUrls: ['./new-patient-exam.component.less'],
})
export class NewPatientExamComponent {
  constructor(
    private modalRef: NzModalRef,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}

  public userLogged = this.authService.getUserLogged();

  public validateFormNewExam: FormGroup<{
    documentTitle: FormControl<string>;
  }> = this.formBuilder.group({
    documentTitle: this.formBuilder.control('', [Validators.required]),
  });

  public firtsUploadPdf!: boolean;
  public selectedPdfFileList: NzUploadFile[] = [];
  public beforeUploadPdf = (file: NzUploadFile): boolean => {
    this.firtsUploadPdf = true;
    this.selectedPdfFileList = [file];
    return false;
  };

  public closeModal(): void {
    this.modalRef.close();
  }

  public sendNewExam(): void {
    this.patientService
      .createNewPatientExam({
        patientId: this.userLogged.id,
        file: this.selectedPdfFileList[0],
        documentTitle: this.validateFormNewExam.value.documentTitle!,
      })
      .subscribe(
        () => {
          this.notificationService.success(
            'Sucesso',
            'O exame foi enviado com sucesso!'
          );
          this.modalRef.close();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }
}

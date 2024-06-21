import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { toNumber } from 'ng-zorro-antd/core/util';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  AuthService,
  Doctor,
  DoctorService,
  Patient,
  PatientService,
} from 'src/app/services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.less'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private modalRef: NzModalRef,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}
  public loading = false;

  public isADoctor = this.authService.validateUserLogged() === 'doctor';
  public user!: Doctor.Receive.DoctorUser | Patient.Receive.PatientUser;

  public doctorInformation!: Doctor.Receive.GetDoctorById;
  public patientInformation!: Patient.Receive.GetPatientById;

  public editDoctorForm: FormGroup<{
    name: FormControl<string>;
    phone: FormControl<string>;
    cell: FormControl<string>;
  }> = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    phone: this.formBuilder.control(''),
    cell: this.formBuilder.control('', [Validators.required]),
  });

  public doctorExpertises!: string[];
  public doctorAgreements!: string[];

  public editPatientForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    cell: FormControl<string>;
    zipCode: FormControl<string>;
    uf: FormControl<string>;
    city: FormControl<string>;
    neighborhood: FormControl<string>;
    street: FormControl<string>;
    number: FormControl<string>;
    complement: FormControl<string>;
  }> = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    email: this.formBuilder.control('', [
      Validators.email,
      Validators.required,
    ]),
    cell: this.formBuilder.control('', [Validators.required]),
    uf: this.formBuilder.control('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    zipCode: this.formBuilder.control('', [Validators.required]),
    city: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    neighborhood: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    street: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    number: this.formBuilder.control('', [
      Validators.pattern(/^[0-9]*$/),
      Validators.required,
    ]),
    complement: this.formBuilder.control(''),
  });

  public canEditInformations = false;
  public validationFormSubmit!: boolean;

  public changeValueCanEditInformations(): void {
    this.canEditInformations = !this.canEditInformations;

    if (this.canEditInformations) {
      this.editDoctorForm.enable();
      this.editPatientForm.enable();
    } else {
      this.editDoctorForm.disable();
      this.editPatientForm.disable();
    }
  }

  public populateEditDoctorForm(data: Doctor.Receive.GetDoctorById): void {
    this.editDoctorForm.patchValue({
      name: data.name,
      phone: data.phone,
    });

    if (data.cell) {
      this.editDoctorForm.patchValue({
        cell: data.cell,
      });
    }

    this.doctorExpertises = data.expertise;
    this.doctorAgreements = data.agreement;
  }

  public populateEditPatientForm(data: Patient.Receive.GetPatientById): void {
    this.editPatientForm.patchValue({
      name: data.name,
      email: data.email,
      cell: data.cell,
      zipCode: data.address.zipCode,
      city: data.address.city,
      uf: data.address.uf,
      neighborhood: data.address.neighborhood,
      street: data.address.street,
      number: data.address.number.toString(),
    });

    if (data.address.complement) {
      this.editPatientForm.patchValue({
        complement: data.address.complement,
      });
    }
  }

  public getUserInformations(): void {
    if (this.authService.validateUserLogged() === 'doctor') {
      this.doctorService.getDoctorById({ doctorId: this.user.id }).subscribe(
        (response) => {
          this.doctorInformation = response;
          this.populateEditDoctorForm(this.doctorInformation);
          this.editDoctorForm.disable();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
    }

    if (this.authService.validateUserLogged() === 'patient') {
      this.patientService.getPatientById({ patientId: this.user.id }).subscribe(
        (response) => {
          this.patientInformation = response;
          this.populateEditPatientForm(this.patientInformation);
          this.editPatientForm.disable();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
    }
  }

  public validateChangeFormDoctor(): boolean {
    return (
      this.editDoctorForm.invalid ||
      this.loading ||
      (this.editDoctorForm.value.name == this.doctorInformation.name &&
        this.editDoctorForm.value.cell == this.doctorInformation.cell &&
        this.editDoctorForm.value.phone == this.doctorInformation.phone)
    );
  }

  public validateChangeFormPatient(): boolean {
    return (
      this.editPatientForm.invalid ||
      this.loading ||
      (this.editPatientForm.value.name == this.patientInformation.name &&
        this.editPatientForm.value.cell == this.patientInformation.cell &&
        this.editPatientForm.value.email == this.patientInformation.email &&
        this.editPatientForm.value.city ==
          this.patientInformation.address.city &&
        this.editPatientForm.value.zipCode?.toString() ==
          this.patientInformation.address.zipCode &&
        this.editPatientForm.value.uf == this.patientInformation.address.uf &&
        this.editPatientForm.value.neighborhood ==
          this.patientInformation.address.neighborhood &&
        this.editPatientForm.value.street ==
          this.patientInformation.address.street &&
        this.editPatientForm.value.number ==
          this.patientInformation.address.number.toString() &&
        this.editPatientForm.value.complement ==
          this.patientInformation.address.complement)
    );
  }

  public sendEditUser() {
    this.loading = true;

    if (this.authService.validateUserLogged() === 'doctor') {
      const payloadDoctor = {
        name: this.editDoctorForm.value.name,
        phone: this.editDoctorForm.value.phone,
        cell: this.editDoctorForm.value.cell,
      };

      this.doctorService.updateDoctor(payloadDoctor).subscribe(
        () => {
          this.notificationService.success(
            'Sucesso',
            'Usuário editado com sucesso'
          );
          this.modalRef.close();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
          this.loading = false;
        }
      );
    }

    if (this.authService.validateUserLogged() === 'patient') {
      const payloadPatient = {
        name: this.editPatientForm.value.name,
        email: this.editPatientForm.value.email,
        cell: this.editPatientForm.value.cell,
        zipCode: this.editPatientForm.value.zipCode,
        uf: this.editPatientForm.value.uf,
        city: this.editPatientForm.value.city,
        neighborhood: this.editPatientForm.value.neighborhood,
        street: this.editPatientForm.value.street,
        number: toNumber(this.editPatientForm.value.number!),
        complement: this.editPatientForm.value.complement,
      };

      this.patientService.updatePatient(payloadPatient).subscribe(
        () => {
          this.notificationService.success(
            'Sucesso',
            'Usuário editado com sucesso'
          );
          this.modalRef.close();
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
          this.loading = false;
        }
      );
    }
  }

  ngOnInit(): void {
    this.user = this.modalRef.getContentComponent().modalRef.config.nzData;
    this.getUserInformations();
  }
}

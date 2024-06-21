import { Component } from '@angular/core';
import { toNumber } from 'ng-zorro-antd/core/util';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DoctorService, PatientService } from 'src/app/services';

interface stepOfRegister {
  index: number;
  title: string;
  icon: string;
  status: 'wait' | 'process' | 'finish' | 'error';
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}

  public resgisterType: 'doctor' | 'patient' = 'patient';

  public stepIndexOfRegisterDoctor = 0;
  public stepIndexOfRegisterPatient = 0;

  public disabledDate = (current: Date): boolean => {
    return current > new Date();
  };

  public listOfExpertiseSelecteds: string[] = [];
  public expertiseOptions = [
    { label: 'Cardiologia', value: 'Cardiologia' },
    { label: 'Dermatologia', value: 'Dermatologia' },
    { label: 'Endocrinologia', value: 'Endocrinologia' },
    { label: 'Gastroenterologia', value: 'Gastroenterologia' },
    { label: 'Geriatria', value: 'Geriatria' },
    { label: 'Ginecologia', value: 'Ginecologia' },
    { label: 'Hematologia', value: 'Hematologia' },
    { label: 'Infectologia', value: 'Infectologia' },
    { label: 'Nefrologia', value: 'Nefrologia' },
    { label: 'Neurologia', value: 'Neurologia' },
    { label: 'Oftalmologia', value: 'Oftalmologia' },
    { label: 'Ortopedia', value: 'Ortopedia' },
    { label: 'Otorrinolaringologia', value: 'Otorrinolaringologia' },
    { label: 'Pediatria', value: 'Pediatria' },
    { label: 'Pneumologia', value: 'Pneumologia' },
    { label: 'Psiquiatria', value: 'Psiquiatria' },
    { label: 'Reumatologia', value: 'Reumatologia' },
    { label: 'Urologia', value: 'Urologia' },
  ];

  public listOfAgreementSelecteds: string[] = [];
  public agreementOptions = [
    { label: 'Particular', value: 'particular' },
    { label: 'Unimed', value: 'unimed' },
    { label: 'Hapvida', value: 'hapvida' },
    { label: 'Bradesco Saúde', value: 'bradesco' },
    { label: 'Amil', value: 'amil' },
    { label: 'SulAmérica', value: 'sulamerica' },
  ];

  public passwordVisible = false;
  public hasUpperCase = false;
  public hasNumbers = false;
  public hasMinLength = false;
  public hasMaxLength = false;

  public stepsOfRegisterDoctor: stepOfRegister[] = [
    {
      index: 0,
      title: 'Dados Pessoais',
      icon: 'user',
      status: 'process',
    },
    {
      index: 1,
      title: 'Conclusão',
      icon: 'check',
      status: 'wait',
    },
  ];

  public stepsOfRegisterPatient: stepOfRegister[] = [
    {
      index: 0,
      title: 'Dados Pessoais',
      icon: 'user',
      status: 'process',
    },
    {
      index: 1,
      title: 'Contato',
      icon: 'phone',
      status: 'wait',
    },
    {
      index: 2,
      title: 'Endereço',
      icon: 'home',
      status: 'wait',
    },
    {
      index: 3,
      title: 'Conclusão',
      icon: 'check',
      status: 'wait',
    },
  ];

  public validateFormDoctor: FormGroup<{
    name: FormControl<string>;
    CRM: FormControl<string>;
    phone: FormControl<string>;
    cell: FormControl<string>;
    expertise: FormControl;
    agreement: FormControl<string>;
    password: FormControl<string>;
  }> = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    CRM: this.formBuilder.control('', [Validators.required]),
    phone: this.formBuilder.control(''),
    cell: this.formBuilder.control('', [Validators.required]),
    expertise: this.formBuilder.control('', [
      Validators.maxLength(2),
      Validators.required,
    ]),
    agreement: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/),
      Validators.required,
    ]),
  });

  public validateFormPatient: FormGroup<{
    name: FormControl<string>;
    cpf: FormControl<string>;
    gender: FormControl<string>;
    dateOfBirth: FormControl<string>;
    cell: FormControl<string>;
    email: FormControl<string>;
    zipCode: FormControl<string>;
    city: FormControl<string>;
    uf: FormControl<string>;
    neighborhood: FormControl<string>;
    street: FormControl<string>;
    number: FormControl<string>;
    complement: FormControl<string>;
    password: FormControl<string>;
  }> = this.formBuilder.group({
    name: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    cpf: this.formBuilder.control('', [
      Validators.minLength(11),
      Validators.required,
    ]),
    gender: this.formBuilder.control('', [Validators.required]),
    dateOfBirth: this.formBuilder.control('', [Validators.required]),
    cell: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [
      Validators.email,
      Validators.required,
    ]),
    zipCode: this.formBuilder.control('', [Validators.required]),
    city: this.formBuilder.control('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    uf: this.formBuilder.control('', [
      Validators.minLength(2),
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
    password: this.formBuilder.control('', [
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
      Validators.required,
    ]),
  });

  public onRegisterTypeChange() {
    this.resgisterType = this.resgisterType === 'doctor' ? 'patient' : 'doctor';
    this.validateFormDoctor.reset();
    this.validateFormPatient.reset();
    this.resetStepsOfRegister();
  }

  public changeStatusOfRegister(
    stepIndexOfRegister: number,
    stepsOfRegister: stepOfRegister[],
    direction: 'next' | 'previous'
  ): void {
    if (direction === 'next') {
      stepsOfRegister[stepIndexOfRegister].status = 'finish';
      stepsOfRegister[stepIndexOfRegister + 1].status = 'process';
    } else {
      stepsOfRegister[stepIndexOfRegister].status = 'wait';
      stepsOfRegister[stepIndexOfRegister - 1].status = 'process';
    }

    if (this.resgisterType === 'doctor') {
      this.stepIndexOfRegisterDoctor =
        direction === 'next'
          ? stepIndexOfRegister + 1
          : stepIndexOfRegister - 1;
    } else {
      this.stepIndexOfRegisterPatient =
        direction === 'next'
          ? stepIndexOfRegister + 1
          : stepIndexOfRegister - 1;
    }
  }

  public resetStepsOfRegister(): void {
    this.stepsOfRegisterDoctor.forEach((step) => {
      step.status = 'wait';
    });
    this.stepsOfRegisterDoctor[0].status = 'process';
    this.stepIndexOfRegisterDoctor = 0;

    this.listOfAgreementSelecteds = [];
    this.listOfExpertiseSelecteds = [];

    this.stepsOfRegisterPatient.forEach((step) => {
      step.status = 'wait';
    });
    this.stepsOfRegisterPatient[0].status = 'process';
    this.stepIndexOfRegisterPatient = 0;
  }

  public validatePassword(form: FormGroup): void {
    this.hasUpperCase = /[A-Z]/.test(form.get('password')!.value);
    this.hasNumbers = /[0-9]/.test(form.get('password')!.value);
    this.hasMinLength = form.get('password')!.value.length >= 8;
    this.hasMaxLength = form.get('password')!.value.length <= 12;
  }

  public registerDoctor(): void {
    this.doctorService
      .createDoctor({
        name: this.validateFormDoctor.get('name')!.value,
        password: this.validateFormDoctor.get('password')!.value,
        CRM: this.validateFormDoctor.get('CRM')!.value,
        expertise: this.listOfExpertiseSelecteds,
        agreement: this.listOfAgreementSelecteds,
        phone: this.validateFormDoctor.get('phone')!.value,
        cell: this.validateFormDoctor.get('cell')!.value,
      })
      .subscribe(
        () => {
          this.notificationService.success(
            'Sucesso!',
            'Um instante, você será redirecionado para o login!'
          );
          this.validateFormDoctor.disable();
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }

  public registerPatient(): void {
    this.patientService
      .createPatient({
        name: this.validateFormPatient.get('name')!.value,
        cpf: this.validateFormPatient.get('cpf')!.value,
        gender: this.validateFormPatient.get('gender')!.value,
        dateOfBirth: this.validateFormPatient.get('dateOfBirth')!.value,
        cell: this.validateFormPatient.get('cell')!.value,
        email: this.validateFormPatient.get('email')!.value,
        zipCode: this.validateFormPatient.get('zipCode')!.value,
        city: this.validateFormPatient.get('city')!.value,
        uf: this.validateFormPatient.get('uf')!.value,
        neighborhood: this.validateFormPatient.get('neighborhood')!.value,
        street: this.validateFormPatient.get('street')!.value,
        number: toNumber(this.validateFormPatient.get('number')!.value),
        complement: this.validateFormPatient.get('complement')!.value,
        password: this.validateFormPatient.get('password')!.value,
      })
      .subscribe(
        () => {
          this.notificationService.success(
            'Sucesso!',
            'Um instante, você será redirecionado para o login!'
          );
          this.validateFormPatient.disable();
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000);
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }
}

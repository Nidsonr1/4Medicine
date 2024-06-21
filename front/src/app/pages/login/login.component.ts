import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DoctorService, PatientService, AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private notificationService: NzNotificationService
  ) {}

  public loginType: 'doctor' | 'patient' = 'patient';
  public passwordVisible = false;

  public validateFormDoctor: FormGroup<{
    crm: FormControl<string>;
    password: FormControl<string>;
  }> = this.formBuilder.group({
    crm: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  public validateFormPatient: FormGroup<{
    cpf: FormControl<string>;
    password: FormControl<string>;
  }> = this.formBuilder.group({
    cpf: this.formBuilder.control('', [Validators.required]),
    password: this.formBuilder.control('', [Validators.required]),
  });

  public onLoginTypeChange() {
    this.loginType = this.loginType === 'doctor' ? 'patient' : 'doctor';
    this.validateFormDoctor.reset();
    this.validateFormPatient.reset();
  }

  public loginDoctor(): void {
    const doctor = {
      CRM: this.validateFormDoctor.get('crm')!.value,
      password: this.validateFormDoctor.get('password')!.value,
    };

    this.doctorService.loginDoctor(doctor).subscribe(
      (response) => {
        this.authService.login(response);

        this.notificationService.success(
          'Sucesso!',
          'Um instante, você será redirecionado para a página inicial!'
        );
        this.validateFormDoctor.disable();
        setTimeout(() => {
          window.location.href = '/inicio';
        }, 3000);
      },
      ({ error }) => {
        this.notificationService.error('Erro', error.message);
      }
    );
  }

  public loginPatient(): void {
    this.patientService
      .loginPatient({
        cpf: this.validateFormPatient.get('cpf')!.value,
        password: this.validateFormPatient.get('password')!.value,
      })
      .subscribe(
        (response) => {
          this.authService.login(response);
          this.notificationService.success(
            'Sucesso',
            'Um instante, você será redirecionado para a página inicial!'
          );
          this.validateFormPatient.disable();
          setTimeout(() => {
            window.location.href = '/inicio';
          }, 3000);
        },
        ({ error }) => {
          this.notificationService.error('Erro', error.message);
        }
      );
  }
}

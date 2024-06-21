import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import en from '@angular/common/locales/en';
import pt from '@angular/common/locales/pt';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideEnvironmentNgxMask,
} from 'ngx-mask';

import { en_US, pt_BR } from 'ng-zorro-antd/i18n';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { AppRoutingModule } from './app-routing.module';

import { DailyViewModule, DiaryViewModule } from './components';

import {
  AuthService,
  DoctorService,
  PatientService,
  FilesService,
} from './services';

import { AppComponent } from './app.component';

import {
  RegisterComponent,
  LoginComponent,
  HomeComponent,
  ReportsComponent,
  ExamsComponent,
  ScheduleComponent,
} from './pages';

import {
  NewPatientReportComponent,
  ShareReportComponent,
  NewPatientExamComponent,
  ShareExamComponent,
  AboutPatientComponent,
  NewAppointmentComponent,
  AppointmentsOfTheDayComponent,
  EditUserComponent,
} from './modals';

registerLocaleData(en);
registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ReportsComponent,
    NewPatientReportComponent,
    ExamsComponent,
    AboutPatientComponent,
    ShareReportComponent,
    ScheduleComponent,
    NewPatientExamComponent,
    ShareExamComponent,
    NewAppointmentComponent,
    AppointmentsOfTheDayComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //Components
    DiaryViewModule,
    DailyViewModule,

    //NgZorro
    NgxMaskDirective,
    NgxMaskPipe,
    NzSwitchModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzStepsModule,
    NzRadioModule,
    NzDatePickerModule,
    NzSelectModule,
    NzNotificationModule,
    NzInputNumberModule,
    NzMessageModule,
    NzAvatarModule,
    NzPopoverModule,
    NzTableModule,
    NzPaginationModule,
    NzToolTipModule,
    NzModalModule,
    NzAutocompleteModule,
    NzAlertModule,
    NzUploadModule,
    NzCalendarModule,
    NzBadgeModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    provideEnvironmentNgxMask(),
    //Services
    AuthService,
    DoctorService,
    PatientService,
    FilesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

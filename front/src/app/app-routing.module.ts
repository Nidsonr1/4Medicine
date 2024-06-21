import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';

import {
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  ReportsComponent,
  ExamsComponent,
  ScheduleComponent,
} from './pages';

const routes: Routes = [
  // localhost:4200/login
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // localhost:4200/cadastro
  { path: 'cadastro', component: RegisterComponent },

  // localhost:4200/home
  { path: 'inicio', component: HomeComponent, canActivate: [AuthGuard] },

  // localhost:4200/reports
  { path: 'laudos', component: ReportsComponent, canActivate: [AuthGuard] },

  // localhost:4200/exams
  { path: 'exames', component: ExamsComponent, canActivate: [AuthGuard] },

  // localhost:4200/diary
  { path: 'agenda', component: ScheduleComponent, canActivate: [AuthGuard] },

  // localhost:4200/anything
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

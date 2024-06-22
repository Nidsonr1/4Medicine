import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { baseURL } from '../test';

export namespace Doctor {
  export namespace Send {
    export interface NewDoctor {
      name: string;
      password: string;
      CRM: string;
      expertise: string[];
      agreement: string[];
      phone?: string;
      cell: string;
    }

    export interface LoginDoctor {
      CRM: string;
      password: string;
    }

    export interface GetDoctorById {
      doctorId: string;
    }

    export interface SearchDoctorByName {
      search: string;
    }

    export interface UpdateDoctor {
      name?: string;
      phone?: string;
      cell?: string;
      agreement?: string[];
      expertise?: string[];
    }

    export interface NewPatientReport {
      patientId: string;
      file: NzUploadFile;
      documentTitle: string;
    }

    export interface FilterTable {
      limit: number;
      offset: number;
    }

    export interface CreateAppointment {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      patientId: string;
      link: string;
    }
  }

  export namespace Receive {
    export interface DoctorUser {
      id: string;
      name: string;
      CRM: string;
      token: string;
    }

    export interface GetDoctorById {
      id: string;
      name: string;
      CRM: string;
      expertise: string[];
      phone: string;
      agreement: string[];
      cell: string | null;
    }

    export interface SearchDoctorByName {
      id: string;
      name: string;
      CRM: string;
      expertise: string[];
      phone: string;
      agreement: string[];
      cell: string | null;
    }

    export interface DoctorReports {
      total: number;
      totalToPage: number;
      reportsToDoctor: Report[];
    }

    export interface Report {
      id: string;
      documentTitle: string;
      document: string;
      createdAt: string;
      doctorId: string;
      patient: {
        id: string;
        name: string;
        dateOfBirth: string;
      };
    }

    export interface DoctorExams {
      total: number;
      totalToPage: number;
      examsToDoctor: Exam[];
    }

    export interface Exam {
      id: string;
      documentTitle: string;
      document: string;
      createdAt: string;
      doctorId: string;
      patient: {
        id: string;
        name: string;
        dateOfBirth: string;
      };
    }

    export interface DoctorAppointments {
      id: string;
      title: string;
      start_date: string;
      end_date: string;
      description: string;
      link: string;
      doctor_id: string;
      patient_id: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = baseURL
  private baseUrlDoctor = `${baseURL}/doctor`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public createDoctor(
    doctor: Doctor.Send.NewDoctor
  ): Observable<Doctor.Send.NewDoctor> {
    return this.http.post<Doctor.Send.NewDoctor>(
      `${this.baseUrlDoctor}/create`,
      doctor
    );
  }

  public loginDoctor(
    doctor: Doctor.Send.LoginDoctor
  ): Observable<Doctor.Receive.DoctorUser> {
    return this.http.post<Doctor.Receive.DoctorUser>(
      `${this.baseUrlDoctor}/login`,
      doctor
    );
  }

  public getDoctorReports(
    filter: Doctor.Send.FilterTable
  ): Observable<Doctor.Receive.DoctorReports> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Doctor.Receive.DoctorReports>(
      `${this.baseUrlDoctor}/reports?limit=${filter.limit}&offset=${filter.offset}`,
      {
        headers: header,
      }
    );
  }

  public getDoctorById(
    params: Doctor.Send.GetDoctorById
  ): Observable<Doctor.Receive.GetDoctorById> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Doctor.Receive.GetDoctorById>(
      `${this.baseUrlDoctor}/info/${params.doctorId}`,
      {
        headers: header,
      }
    );
  }

  public searchDoctorByName(
    params: Doctor.Send.SearchDoctorByName
  ): Observable<Doctor.Receive.SearchDoctorByName[]> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Doctor.Receive.SearchDoctorByName[]>(
      `${this.baseUrlDoctor}/list?search=${params?.search}`,
      {
        headers: header,
      }
    );
  }

  public updateDoctor(
    params: Doctor.Send.UpdateDoctor
  ): Observable<Doctor.Receive.GetDoctorById> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.patch<Doctor.Receive.GetDoctorById>(
      `${this.baseUrlDoctor}/update`,
      params,
      {
        headers: header,
      }
    );
  }

  public createNewPatientReport(
    newReport: Doctor.Send.NewPatientReport
  ): Observable<Doctor.Receive.DoctorReports> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    const formatnewReport = new FormData();
    formatnewReport.append('patientId', newReport.patientId);
    formatnewReport.append('file', newReport.file as any);
    formatnewReport.append('documentTitle', newReport.documentTitle);

    return this.http.post<Doctor.Receive.DoctorReports>(
      `${this.baseUrlDoctor}/reports/upload`,
      formatnewReport,
      {
        headers: header,
      }
    );
  }

  public getDoctorExams(
    filter: Doctor.Send.FilterTable
  ): Observable<Doctor.Receive.DoctorExams> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Doctor.Receive.DoctorExams>(
      `${this.baseUrlDoctor}/exams?limit=${filter.limit}&offset=${filter.offset}`,
      {
        headers: header,
      }
    );
  }

  public createAppointment(
    newAppointment: Doctor.Send.CreateAppointment
  ): Observable<Doctor.Receive.DoctorAppointments> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.post<Doctor.Receive.DoctorAppointments>(
      `${this.baseUrl}/appointment/create`,
      newAppointment,
      {
        headers: header,
      }
    );
  }

  public getDoctorAppointments(): Observable<
    Doctor.Receive.DoctorAppointments[]
  > {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Doctor.Receive.DoctorAppointments[]>(
      `${this.baseUrlDoctor}/appointments`,
      {
        headers: header,
      }
    );
  }
}

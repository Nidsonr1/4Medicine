import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';

export namespace Patient {
  export namespace Send {
    export interface NewPatient {
      name: string;
      cpf: string;
      gender: string;
      dateOfBirth: string;
      cell: string;
      email: string;
      zipCode: string;
      city: string;
      uf: string;
      neighborhood: string;
      street: string;
      number: number;
      complement?: string;
      password: string;
    }

    export interface LoginPatient {
      cpf: string;
      password: string;
    }

    export interface GetPatientById {
      patientId: string;
    }

    export interface SearchPatientByName {
      search: string;
    }

    export interface UpdatePatient {
      name?: string;
      email?: string;
      cell?: string;
      zipCode?: string;
      city?: string;
      uf?: string;
      neighborhood?: string;
      street?: string;
      number?: number;
      complement?: string;
    }

    export interface ShareReportWithDoctor {
      doctorId: string;
      reportId: string;
    }

    export interface UnshareReportWithDoctor {
      doctorName: string;
      reportId: string;
    }

    export interface NewPatientExam {
      patientId: string;
      file: NzUploadFile;
      documentTitle: string;
    }

    export interface ShareExamWithDoctor {
      doctorId: string;
      examId: string;
    }

    export interface UnshareExamWithDoctor {
      doctorName: string;
      examId: string;
    }

    export interface FilterTable {
      limit: number;
      offset: number;
    }
  }
  export namespace Receive {
    export interface PatientUser {
      id: string;
      name: string;
      email: string;
      token: string;
    }

    export interface GetPatientById {
      id: string;
      name: string;
      cpf: string;
      email: string;
      dateOfBirth: string;
      cell: string;
      address: {
        zipCode: string;
        city: string;
        uf: string;
        neighborhood: string;
        street: string;
        number: number;
        complement?: string;
      };
    }

    export interface SearchPatientByName {
      id: string;
      name: string;
      cpf: string;
    }

    export interface PatientReports {
      total: number;
      totalToPage: number;
      reportsToPatient: Report[];
    }

    export interface Report {
      id: string;
      documentTitle: string;
      document: string;
      sharedBy: string[];
      createdAt: string;
      patientId: string;
      doctor: {
        id: string;
        name: string;
        expertise: string[];
      };
    }

    export interface PatientExams {
      total: number;
      totalToPage: number;
      examsToPatient: Exam[];
    }

    export interface Exam {
      id: string;
      documentTitle: string;
      document: string;
      sharedBy: string[];
      createdAt: string;
      patientId: string;
      doctor: {
        id: string;
        name: string;
        expertise: string[];
      };
    }

    export interface PatientAppointments {
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
export class PatientService {
  private baseUrl = 'http://localhost:3333';
  private baseUrlPatient = 'http://localhost:3333/patient';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public createPatient(
    patient: Patient.Send.NewPatient
  ): Observable<Patient.Send.NewPatient> {
    return this.http.post<any>(`${this.baseUrlPatient}/create`, patient);
  }

  public loginPatient(
    patient: Patient.Send.LoginPatient
  ): Observable<Patient.Receive.PatientUser> {
    return this.http.post<Patient.Receive.PatientUser>(
      `${this.baseUrlPatient}/login`,
      patient
    );
  }

  public getPatientById(params: Patient.Send.GetPatientById) {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Patient.Receive.GetPatientById>(
      `${this.baseUrlPatient}/info/${params.patientId}`,
      {
        headers: header,
      }
    );
  }

  public searchPatientByName(
    params: Patient.Send.SearchPatientByName
  ): Observable<Patient.Receive.SearchPatientByName[]> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Patient.Receive.SearchPatientByName[]>(
      `${this.baseUrlPatient}/search/?search=${params?.search}`,
      {
        headers: header,
      }
    );
  }

  public updatePatient(
    params: Patient.Send.UpdatePatient
  ): Observable<Patient.Receive.GetPatientById> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.patch<Patient.Receive.GetPatientById>(
      `${this.baseUrlPatient}/update`,
      params,
      {
        headers: header,
      }
    );
  }

  public getPatientReports(
    filter: Patient.Send.FilterTable
  ): Observable<Patient.Receive.PatientReports> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Patient.Receive.PatientReports>(
      `${this.baseUrlPatient}/reports?limit=${filter.limit}&offset=${filter.offset}`,
      {
        headers: header,
      }
    );
  }

  public shareReport(
    params: Patient.Send.ShareReportWithDoctor
  ): Observable<Patient.Receive.PatientReports> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.patch<Patient.Receive.PatientReports>(
      `${this.baseUrlPatient}/reports/shared/${params.reportId}
      `,
      params,
      {
        headers: header,
      }
    );
  }

  public unshareReport(
    params: Patient.Send.UnshareReportWithDoctor
  ): Observable<Patient.Receive.PatientReports> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.patch<Patient.Receive.PatientReports>(
      `${this.baseUrlPatient}/reports/unshared/${params.reportId}`,
      params,
      {
        headers: header,
      }
    );
  }

  public getPatientExams(
    filter: Patient.Send.FilterTable
  ): Observable<Patient.Receive.PatientExams> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Patient.Receive.PatientExams>(
      `${this.baseUrlPatient}/exams?limit=${filter.limit}&offset=${filter.offset}`,
      {
        headers: header,
      }
    );
  }

  public createNewPatientExam(
    newExam: Patient.Send.NewPatientExam
  ): Observable<Patient.Receive.PatientExams> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    const formatnewExam = new FormData();
    formatnewExam.append('patientId', newExam.patientId);
    formatnewExam.append('file', newExam.file as any);
    formatnewExam.append('documentTitle', newExam.documentTitle);

    return this.http.post<Patient.Receive.PatientExams>(
      `${this.baseUrlPatient}/exams/upload`,
      formatnewExam,
      {
        headers: header,
      }
    );
  }

  public shareExam(
    params: Patient.Send.ShareExamWithDoctor
  ): Observable<Patient.Receive.PatientExams> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.patch<Patient.Receive.PatientExams>(
      `${this.baseUrlPatient}/exams/shared/${params.examId}`,
      params,
      {
        headers: header,
      }
    );
  }

  public unshareExam(
    params: Patient.Send.UnshareExamWithDoctor
  ): Observable<Patient.Receive.PatientExams> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.patch<Patient.Receive.PatientExams>(
      `${this.baseUrlPatient}/exams/unshared/${params.examId}`,
      params,
      {
        headers: header,
      }
    );
  }

  public getPatientAppointments(): Observable<
    Patient.Receive.PatientAppointments[]
  > {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return this.http.get<Patient.Receive.PatientAppointments[]>(
      `${this.baseUrlPatient}/appointments`,
      {
        headers: header,
      }
    );
  }
}

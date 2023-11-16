export interface IRegisterReportRequest {
  documentTitle: string;
  patientId: string;
  document: string | undefined;
  sharedBy?: string[];
  doctorId: string;
}

export interface IPrismaRegisterReport {
  documentTitle: string;
  document: string;
  sharedBy?: string[];
  patient_id: string;
  doctor_id: string;
}

export interface IListReportsRequest {
  customerId: string,
  order?: string,
  search?: string
}

export interface IListReportsResponse {
  id: string
  document: string
  createdAt: string
  patient: {
    patientId: string
    name: string
  }
}

export interface ISharedReports {
  reportId: string;
  doctorId: string;
  patientId: string
}


export interface IListReportToDoctor {
  id: string;
  documentTitle: string;
  document: string;
  created_at: Date;
  doctor_id: string;
  patient: object
}

export interface IListReportToPatient {
  id: string;
  documentTitle: string;
  document: string;
  sharedBy: string[],
  created_at: Date;
  patient_id: string;
  doctor: object
}

export interface ILIstReportsSharedRequest {
  reportId: string;
  doctorId: string;
  doctorName: string;
}
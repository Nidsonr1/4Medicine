export interface IRegisterReportRequest {
  patientId: string;
  document: string | undefined;
  sharedBy?: string[];
  doctorId: string;
}

export interface IPrismaRegisterReport {
  document: string;
  sharedBy?: string[];
  patient_id: string;
  doctor_id: string;
}

export interface IListReportsRequest {
  customerId: string,
  order: string,
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
export interface RegisterReportRequest {
  patientId: string;
  document: string;
  sharedBy?: string[]
}

export interface PrismaRegisterReport {
  document: string;
  sharedBy?: string[];
  patient_id: string;
  doctor_id: string;
}

export interface listReportsRequest {
  customerId: string,
  order: string,
  search?: string
}
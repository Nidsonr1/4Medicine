export interface IRegisterAppointmentRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  doctorId: string;
  patientId: string;
}

export interface IPrismaCreateAppointment {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  patient_id: string;
  doctor_id: string;
  link: string;
}

export interface IRegisterAppointmentResponse {
  title: string;
  startDate: string;
  endDate: string;
  description: string | null;
  link: string;
}

export interface IFindByDateRequest {
  startDate: Date;
  endDate: Date;
  doctorId: string;
  patientId: string;
}
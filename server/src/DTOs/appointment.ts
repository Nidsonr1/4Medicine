export interface RegisterAppointmentRequest {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  doctorId: string;
  patientId: string;
}

export interface PrismaCreateAppointment {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  patient_id: string;
  doctor_id: string;
  link: string;
}

export interface RegisterAppointmentResponse {
  title: string;
  startDate: string;
  endDate: string;
  description: string | null;
  link: string;
}

export interface FindByDateRequest {
  startDate: Date;
  endDate: Date;
  doctorId: string;
  patientId: string;
}
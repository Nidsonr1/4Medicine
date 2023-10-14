export interface PrismaRegisterExam {
  document: string;
  sharedBy?: string[];
  patient_id: string;
  doctor_id: string
}

export interface RegisterExamRequest {
	document: string;
	patientId: string;
  doctorId: string;
  sharedBy?: string[];
}
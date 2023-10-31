export interface IPrismaRegisterExam {
  document: string;
  sharedBy?: string[];
  patient_id: string;
  doctor_id: string
}

export interface IRegisterExamRequest {
	document: string;
	patientId: string;
  doctorId: string;
  sharedBy?: string[];
}

export interface IListExams {
  customerId: string,
  order?: string,
  search?: string
}

export interface ISharedExam {
  examId: string;
  doctorId: string;
  patientId: string
}

export interface IListExamsToDoctor {
  id: string;
  document: string;
  created_at: Date;
  doctor_id: string;
  patient: object
}

export interface IListExamsToPatient {
  id: string;
  document: string;
  sharedBy: string[],
  created_at: Date;
  patient_id: string;
  doctor: object
}

export interface IListExamSharedRequest {
  examId: string;
  doctorId: string;
  doctorName: string
}
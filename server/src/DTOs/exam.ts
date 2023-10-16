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
  order: string,
}

export interface ISharedExam {
  examId: string;
  doctorId: string;
  patientId: string
}
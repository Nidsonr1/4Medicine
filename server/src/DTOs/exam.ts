export interface IPrismaRegisterExam {
  documentTitle: string;
  document: string;
  sharedBy?: string[];
  patient_id: string;
}

export interface IRegisterExamRequest {
  documentTitle: string;
	document: string;
	patientId: string;
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
  patient: object
}

export interface IListExamsToPatient {
  id: string;
  document: string;
  sharedBy: string[],
  created_at: Date;
  patient_id: string;
}

export interface IListExamSharedRequest {
  examId: string;
  doctorName: string
}
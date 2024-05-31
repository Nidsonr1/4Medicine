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
  customerId: string;
  order?: string;
  search?: string;
  limit: number;
  offset: number;
}

export interface ISharedExam {
  examId: string;
  doctorId: string;
  patientId: string
}

export interface IUnshareExam {
  examId: string;
  document: string;
  sharedBy?: string[],
  patient_id: string
}

export interface IListExamsToDoctorToDomain {
  id: string;
  documentTitle: string;
  document: string;
  created_at: Date;
  patient: object
}

export interface IListExamsToDoctor {
  exams: IListExamsToDoctorToDomain[];
  total: number;
  totalPage: number;
}

export interface IListExamsToPatientToDomain {
  id: string;
  documentTitle: string;
  document: string;
  sharedBy: string[];
  created_at: Date;
  patient_id: string;
}

export interface IListExamsToPatient {
  exams: IListExamsToPatientToDomain[];
  total: number;
  totalPage: number;
}

export interface IListExamSharedRequest {
  examId: string;
  doctorName: string
}
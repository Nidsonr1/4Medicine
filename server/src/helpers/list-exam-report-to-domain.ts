interface IListExamReportToPatient {
  id: string;
  document: string;
  sharedBy: string[];
  created_at: Date;
  patient_id: string;
  doctor: object;
}

interface IListExamReportToDoctor {
  id: string;
  document: string;
  created_at: Date;
  doctor_id: string;
  patient: object;
}

export async function listToPatient(data: IListExamReportToPatient) {
	return {
		id: data.id,
		document: data.document,
		sharedBy: data.sharedBy,
		createdAt: data.created_at,
		patientId: data.patient_id,
		doctor: data.doctor
	};
}

export async function listToDoctor(data: IListExamReportToDoctor) {
	return {
		id: data.id,
		document: data.document,
		createdAt: data.created_at,
		doctorId: data.doctor_id,
		patient: data.patient
	};
}
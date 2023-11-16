import { IListReportToDoctor, IListReportToPatient } from '@DTO/report';

export async function listToPatient(data: IListReportToPatient) {
	return {
		id: data.id,
		documentTitle: data.documentTitle,
		document: data.document,
		sharedBy: data.sharedBy,
		createdAt: data.created_at,
		patientId: data.patient_id,
		doctor: data.doctor
	};
}

export async function listToDoctor(data: IListReportToDoctor) {
	return {
		id: data.id,
		documentTitle: data.documentTitle,
		document: data.document,
		createdAt: data.created_at,
		doctorId: data.doctor_id,
		patient: data.patient
	};
}
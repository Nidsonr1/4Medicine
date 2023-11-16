import { IListExamsToDoctor, IListExamsToPatient } from '@DTO/exam';

export async function ListToPatient(data: IListExamsToPatient) {
	return {
		id: data.id,
		documentTitle: data.documentTitle,
		document: data.document,
		sharedBy: data.sharedBy,
		createdAt: data.created_at,
		patientId: data.patient_id
	};
}

export async function ListToDoctor(data: IListExamsToDoctor) {
	return {
		id: data.id,
		documentTitle: data.documentTitle,
		document: data.document,
		createdAt: data.created_at,
		patient: data.patient
	};
}
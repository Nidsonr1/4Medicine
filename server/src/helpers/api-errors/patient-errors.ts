import { ApiErrors } from './api-errors';

export class PatientNotFound extends ApiErrors {
	constructor() {
		super('Paciente não encontrado', 404);
	}
}

export class PatientAlreadyExist extends ApiErrors {
	constructor() {
		super('CPF já cadastrado!', 409);
	}
}
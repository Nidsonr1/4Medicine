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

export class InvalidCredentials extends ApiErrors {
	constructor() {
		super('E-mail e/ou senha inválidos!!', 404);
	}
}

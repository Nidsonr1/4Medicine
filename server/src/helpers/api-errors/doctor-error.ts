import { ApiErrors } from './api-errors';

export class DoctorAlreadyExist extends ApiErrors {
	constructor() {
		super('CRM já cadastrado!', 409);
	}
}

export class DoctorNotFound extends ApiErrors {
	constructor() {
		super('Médico não encontrado!', 404);
	}
}

export class InvalidCredentials extends ApiErrors {
	constructor() {
		super('CRM e/ou senha inválidos!', 404);
	}
}

export class DoctorAlreadyHasAccess extends ApiErrors {
	constructor() {
		super('Seu arquivo já foi compartilhado com este profissional!', 400);
	}
}

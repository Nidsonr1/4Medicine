export class DoctorAlreadyExist extends Error {
	constructor() {
		super('CRM já cadastrado!');
	}
}

export class DoctorNotFound extends Error {
	constructor() {
		super('Médico não encontrado!');
	}
}

export class InvalidCredentials extends Error {
	constructor() {
		super('CRM e/ou senha inválidos!');
	}
}
export class PatientNotFound extends Error {
	constructor() {
		super('Paciente não encontrado');
	}
}

export class PatientAlreadyExist extends Error {
	constructor() {
		super('CPF já cadastrado!');
	}
}

export class InvalidCredentials extends Error {
	constructor() {
		super('E-mail e/ou senha inválidos!!');
	}
}

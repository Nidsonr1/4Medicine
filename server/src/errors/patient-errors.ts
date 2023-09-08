export class PatientNotFound extends Error {
	constructor() {
		super('Patient Not Found');
	}
}

export class PatientAlreadyExist extends Error {
	constructor() {
		super('cpf already exist!');
	}
}


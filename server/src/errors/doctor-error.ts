export class DoctorAlreadyExist extends Error {
	constructor() {
		super('CRM already exist.');
	}
}

export class DoctorNotFound extends Error {
	constructor() {
		super('Doctor Not Found!');
	}
}

export class Unauthenticated extends Error {
	constructor() {
		super('Token Missing');
	}
}

export class InvalidCredentials extends Error {
	constructor() {
		super('CRM or password invalid!');
	}
}
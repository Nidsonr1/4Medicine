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
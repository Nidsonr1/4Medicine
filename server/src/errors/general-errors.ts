export class Unauthenticated extends Error {
	constructor() {
		super('Token Missing');
	}
}

export class InvalidCredentials extends Error {
	constructor() {
		super('E-mail or password invalid!');
	}
}
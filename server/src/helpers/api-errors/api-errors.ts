export class ApiErrors extends Error {
	public readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class Unauthenticated extends ApiErrors {
	constructor() {
		super('Token Missing', 401);
	}
}

export class InvalidCredentials extends ApiErrors {
	constructor() {
		super('Credenciais Inválidas!!', 404);
	}
}
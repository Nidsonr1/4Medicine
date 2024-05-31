import { ApiErrors } from './api-errors';

export class UnshareError extends ApiErrors {
	constructor() {
		super('Este médico não possui acesso a este registro', 400);
	}
}

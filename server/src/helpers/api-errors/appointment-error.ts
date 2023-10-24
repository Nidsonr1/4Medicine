import { ApiErrors } from './api-errors';

export class AppointmentAlreadyExist extends ApiErrors {
	constructor() {
		super('Horário já agendado! Agende em um outro horário', 409);
	}
}

export class InvalidDates extends ApiErrors {
	constructor(message: string) {
		super(message, 400);
	}
}

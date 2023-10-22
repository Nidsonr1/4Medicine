import { ApiErrors } from './api-errors';

export class AppointmentAlreadyExist extends ApiErrors {
	constructor() {
		super('Horário já agendado! Agende em um outro horário', 409);
	}
}

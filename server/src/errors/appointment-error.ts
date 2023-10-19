export class AppointmentAlreadyExist extends Error {
	constructor() {
		super('Horário já agendado! Agende em um outro horário');
	}
}
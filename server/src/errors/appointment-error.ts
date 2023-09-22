export class AppointmentAlreadyExist extends Error {
	constructor() {
		super('Time slot is already occupied. Please choose another time slot.');
	}
}
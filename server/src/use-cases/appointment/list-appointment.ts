import { AppointmentRepository } from '@repositories/appointment-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListAppointmentUseCase {
	constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: AppointmentRepository
	) {}

	async execute(customerId: string) {
		const appointments = await this.appointmentRepository.listByCustomer(customerId);

		return appointments;
	}
}
import { IListAppointmentRequest } from '@DTO/appointment';
import { AppointmentRepository } from '@repositories/appointment-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListAppointmentUseCase {
	constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: AppointmentRepository
	) {}

	async execute(data: IListAppointmentRequest) {
		const appointments = await this.appointmentRepository.listByCustomer(data.customerId);

		return appointments;
	}
}
import { IListAppointmentRequest } from '@DTO/appointment';
import { AppointmentRepository } from '@repositories/appointment-repository';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListAppointmentUseCase {
	constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: AppointmentRepository
	) {}

	async execute(data: IListAppointmentRequest) {
		if(data.date) {
			const startDate = dayjs(data.date).subtract(3, 'hour').toDate();
			const endDate = dayjs(startDate).add(23, 'hour').add(59, 'minute').toDate();

			const listAppointment = {
				...data,
				startDate,
				endDate,
			};

			const appointments = await this.appointmentRepository.listByCustomer(listAppointment);

			return appointments;
		}
		
		const listAppointment = {
			...data,
			startDate: undefined,
			endDate: undefined
		};
		const appointments = await this.appointmentRepository.listByCustomer(listAppointment);

		return appointments;
	}
}
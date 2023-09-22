import { AppointmentRepository } from '@repositories/appointment-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListAppointmentUseCase {
	constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: AppointmentRepository
	) {}

	async execute(patientId: string, doctorId: string) {
		const appointments = await this.appointmentRepository.listByCustomer(patientId, doctorId);

		const result = appointments?.map((appointment) => {
			return {
				id: appointment.id,
				title: appointment.title,
				start_date: appointment.start_date,
				end_date: appointment.end_date,
				description: appointment.description,
				link: appointment.link,
			};
		});

		return result;
	}
}
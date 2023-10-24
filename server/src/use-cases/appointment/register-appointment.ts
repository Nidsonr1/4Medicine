import { inject, injectable } from 'tsyringe';
import dayjs from 'dayjs';

import { IRegisterAppointmentRequest } from '@DTO/appointment';
import { AppointmentAlreadyExist, InvalidDates } from '@helpers/api-errors/appointment-error';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { AppointmentRepository } from '@repositories/appointment-repository';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { isValidDate } from '@helpers/isValidDate';

@injectable()
export class RegisterAppointmentUseCase {
	constructor (
    @inject('PatientRepository')
    private patietnRepository: PatientRepository,

    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository,

		@inject('AppointmentRepository')
		private appointmentRepository: AppointmentRepository
	) {}

	async execute(data: IRegisterAppointmentRequest) {
		const currentDate = dayjs(dayjs().toDate()).subtract(3, 'hour').toDate();
		const startDate = dayjs(data.startDate).toDate();
		const endDate = dayjs(data.endDate).toDate();

		const [
			doctorExist,
			patientExist,
			overlappingAppointment
		] = await Promise.all([
			this.doctorRepository.findById(data.doctorId),
			this.patietnRepository.findById(data.patientId),
			this.appointmentRepository.findByDate({
				startDate,
				endDate,
				patientId: data.patientId,
				doctorId: data.doctorId
			})
		]);
		
		const returnValidDate = isValidDate(startDate, endDate, currentDate);

		if (returnValidDate) {
			throw new InvalidDates(returnValidDate);
		}

		if (!patientExist) {
			throw new PatientNotFound();
		}
		
		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		if (overlappingAppointment) {
			throw new AppointmentAlreadyExist();
		}

		const appointment = {
			title: data.title,
			description: data.description,
			startDate,
			endDate,
			doctor_id: data.doctorId,
			patient_id: data.patientId,
			link: data.link
		};

		await this.appointmentRepository.create(appointment);
	}
}

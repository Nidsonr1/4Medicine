import { IRegisterAppointmentRequest } from '@DTO/appointment';
import { AppointmentAlreadyExist } from '@helpers/api-errors/appointment-error';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { AppointmentRepository } from '@repositories/appointment-repository';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';


/**
		 * TO-DO:
		 * [X] - Verificar a existência do médico e paciente
		 * [X] - Retornar erros caso eles não existam
		 * [X] - Verificar se existe uma consulta marcada para aquele horário
		 * [] - Criar integração com o Meet SDK
		 * [X] - Criar a consulta
*/


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
		const [
			doctorExist,
			patientExist
		] = await Promise.all([
			this.doctorRepository.findById(data.doctorId),
			this.patietnRepository.findById(data.patientId),
		]);

		if (!patientExist) {
			throw new PatientNotFound();
		}

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		const startDate = dayjs(data.startDate).toDate();
		const endDate = dayjs(data.endDate).toDate();

		const overlappingAppointment = await this.appointmentRepository.findByDate({
			startDate,
			endDate,
			patientId: data.patientId,
			doctorId: data.doctorId
		});

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
			link: 'http://meet.com'
		};

		await this.appointmentRepository.create(appointment);
	}
}

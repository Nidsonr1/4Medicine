import { inject, injectable } from 'tsyringe';

import { RegisterReportRequest } from '@DTO/report';
import { DoctorNotFound } from '@errors/doctor-error';
import { PatientNotFound } from '@errors/patient-errors';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { ReportRepository } from '@repositories/report-repository';


@injectable()
export class RegisterReportUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository,

    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository,

    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}


	async execute(data: RegisterReportRequest) {
		const [
			doctorExist,
			patientExist
		] = await Promise.all([
			this.doctorRepository.findById(data.doctorId),
			this.patientRepository.findById(data.patientId)
		]);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		if (!patientExist) {
			throw new PatientNotFound();
		}

		/**
		 * To-Do
		 * [] - Criar upload para o arquivo do Laudo
		 */
		await this.reportRepository.create({
			doctor_id: data.doctorId,
			patient_id: data.patientId,
			document: data.document,
			sharedBy: data.sharedBy
		});
	}
}
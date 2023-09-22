import { inject, injectable } from 'tsyringe';

import { RegisterReportRequest } from '@DTO/report';
import { DoctorNotFound } from '@errors/doctor-error';
import { PatientNotFound } from '@errors/patient-errors';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { ReportRepository } from '@repositories/report-repository';


/**
 * [X] - Verificar a existência do paciente e médico
 * [X] - Caso não exista retornar os erros
 * [] - Ajustar para receber laudo via upload
 * [X] - Criar o laudo
 */

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


	async execute(data: RegisterReportRequest, doctorId: string) {
		const [
			doctorExist,
			patientExist
		] = await Promise.all([
			this.doctorRepository.findById(doctorId),
			this.patientRepository.findById(data.patientId)
		]);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		if (!patientExist) {
			throw new PatientNotFound();
		}

		const newReport = {
			doctor_id: doctorId,
			patient_id: data.patientId,
			document: data.document,
			sharedBy: data.sharedBy
		};

		await this.reportRepository.create(newReport);
	}
}
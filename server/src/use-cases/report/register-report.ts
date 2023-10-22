import { inject, injectable } from 'tsyringe';

import { IRegisterReportRequest } from '@DTO/report';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
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


	async execute(data: IRegisterReportRequest) {
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

		const newReport = {
			doctor_id: data.doctorId,
			patient_id: data.patientId,
			document: data.document as string,
		};
	
		await this.reportRepository.create(newReport);
	}
} 

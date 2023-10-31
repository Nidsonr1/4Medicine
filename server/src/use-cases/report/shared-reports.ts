import { inject, injectable } from 'tsyringe';

import { ISharedReports } from '@DTO/report';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { ReportRepository } from '@repositories/report-repository';
import { DoctorNotFound, DoctorAlreadyHasAccess } from '@helpers/api-errors/doctor-error';

@injectable()
export class SharedReportsUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository,

    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository,

    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: ISharedReports) {
		const [
			doctorExist,
			patientExist,
		] = await Promise.all([
			this.doctorRepository.findById(data.doctorId),
			this.patientRepository.findById(data.patientId),
		]);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		if (!patientExist) {
			throw new PatientNotFound();
		}

		const validateDoctorAlreadyShared = {
			reportId: data.reportId,
			doctorId: data.doctorId,
			doctorName: doctorExist.name
		};

		const doctorAlreadyShared = await this.reportRepository.listShared(validateDoctorAlreadyShared);

		if (doctorAlreadyShared) {
			throw new DoctorAlreadyHasAccess();
		}

		await this.reportRepository.sharedBy(data, doctorExist.name);
	}
}

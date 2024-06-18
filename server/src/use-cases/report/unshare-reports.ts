import { inject, injectable } from 'tsyringe';

import { ReportRepository } from '@repositories/report-repository';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { IUnsharedReportsRequest } from '@DTO/report';

import { DoctorNotFound } from '@errors/doctor-error';
import { PatientNotFound } from '@errors/patient-errors';
import { UnshareError } from '@errors/reports-exams-errors';

@injectable()
export class UnsharedReportsUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository,

    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository,

    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: IUnsharedReportsRequest) {
		const [
			doctorExist,
			patientExist
		] = await Promise.all([
			this.doctorRepository.findByName(data.doctorName),
			this.patientRepository.findById(data.patientId)
		]);

		if (!doctorExist) throw new DoctorNotFound();

		if (!patientExist) throw new PatientNotFound();

		const doctorAlreadyHasAccess = await this.reportRepository.listShared({
			reportId: data.reportId,
			doctorName: doctorExist.name
		});

		if (!doctorAlreadyHasAccess) throw new UnshareError();

		const updateSharedBy = doctorAlreadyHasAccess.sharedBy.filter(name => name !== doctorExist.name);

		const updateReport = {
			reportId: data.reportId,
			document: doctorAlreadyHasAccess.document,
			documentTitle: doctorAlreadyHasAccess.documentTitle,
			patient_id: doctorAlreadyHasAccess.patient_id,
			sharedBy: updateSharedBy
		};

		await this.reportRepository.unshare(updateReport);
	}
}
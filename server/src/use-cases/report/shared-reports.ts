import { ISharedReports } from '@DTO/report';
import { DoctorAlreadyShared, DoctorNotFound } from '@errors/doctor-error';
import { PatientNotFound } from '@errors/patient-errors';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { ReportRepository } from '@repositories/report-repository';
import { inject, injectable } from 'tsyringe';

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
		const validateDoctorAlreadyShared = {
			customerId: data.doctorId,
			order: 'asc'
		};

		const [
			doctorExist,
			patientExist,
			doctorAlreadyShared
		] = await Promise.all([
			this.doctorRepository.findById(data.doctorId),
			this.patientRepository.findById(data.patientId),
			this.reportRepository.listToDoctor(validateDoctorAlreadyShared)
		]);
    
		
		if (doctorAlreadyShared) {
			throw new DoctorAlreadyShared();
		}

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		if (!patientExist) {
			throw new PatientNotFound();
		}

		await this.reportRepository.sharedBy(data);
	}
}
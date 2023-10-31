import { inject, injectable } from 'tsyringe';

import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';

import { ISharedExam } from '@DTO/exam';
import { DoctorAlreadyHasAccess, DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { ExamRepository } from '@repositories/exam-repository';

@injectable()
export class SharedExamsUseCase {
	constructor(
    @inject('ExamRepository')
    private examRepository: ExamRepository,

    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository,

    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: ISharedExam) {
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

		const validateDoctroWithAccess = {
			examId: data.examId,
			doctorId: data.doctorId,
			doctorName: doctorExist.name
		};

		const doctorAlreadyHasAccess = await this.examRepository.listShared(validateDoctroWithAccess);

		if (doctorAlreadyHasAccess) throw new DoctorAlreadyHasAccess();

		await this.examRepository.sharedTo(
			data,
			doctorExist.name
		);
	}
}

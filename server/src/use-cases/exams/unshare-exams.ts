import { inject, injectable } from 'tsyringe';

import { ExamRepository } from '@repositories/exam-repository';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';

import { ISharedExam } from '@DTO/exam';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { UnshareError } from '@errors/reports-exams-errors';

@injectable()
export class UnharedExamsUseCase {
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

		const validateDoctorWithAccess = {
			examId: data.examId,
			doctorId: data.doctorId,
			doctorName: doctorExist.name
		};

		const doctorAlreadyHasAccess = await this.examRepository.listShared(validateDoctorWithAccess);
		
		if (!doctorAlreadyHasAccess) throw new UnshareError();

		const updateSharedBy = doctorAlreadyHasAccess.sharedBy.filter(name => name !== doctorExist.name);

		const updateExam = {
			examId: data.examId,
			document: doctorAlreadyHasAccess.document,
			documentTitle: doctorAlreadyHasAccess.documentTitle,
			patient_id: doctorAlreadyHasAccess.patient_id,
			sharedBy: updateSharedBy
		};

		await this.examRepository.unshare(updateExam);
	}
}

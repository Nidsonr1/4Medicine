import { IRegisterExamRequest } from '@DTO/exam';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { ExamRepository } from '@repositories/exam-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RegisterExamsUseCase {
	constructor(
		@inject('ExamRepository')
		private examRepository: ExamRepository,

    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: IRegisterExamRequest) {
		const patientAlreadyExist = await this.patientRepository.findById(data.patientId);

		
		if (!patientAlreadyExist) {
			throw new PatientNotFound();
		}

		const newExam = {
			doctor_id: data.doctorId,
			patient_id: data.patientId,
			document: data.document,
		};

		await this.examRepository.create(newExam);
	}
}

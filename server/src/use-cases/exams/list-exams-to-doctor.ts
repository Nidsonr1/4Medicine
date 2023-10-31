import { IListExams } from '@DTO/exam';
import { DoctorNotFound } from '@errors/doctor-error';
import { listToDoctor } from '@helpers/list-exam-report-to-domain';
import { DoctorRepository } from '@repositories/doctor-repository';
import { ExamRepository } from '@repositories/exam-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListExamsToDoctorUseCase {
	constructor(
    @inject('ExamRepository')
    private examRepository: ExamRepository,

		@inject('DoctorRepository')
		private doctorRepository: DoctorRepository
	) {}

	async execute(data: IListExams) {
		const doctorExist = await this.doctorRepository.findById(data.customerId);

		if (!doctorExist) throw new DoctorNotFound();

		const exams = await this.examRepository.listToDoctor(
			data, 
			doctorExist.name
		);

		if (!exams) return null;

		const promise = exams.map((exam) => {
			return listToDoctor(exam);
		});

		return (await Promise.all(promise)).map(examsDoctor => {
			return examsDoctor;
		});
	}
}
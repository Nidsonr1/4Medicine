import { IListExams } from '@DTO/exam';
import { ListToPatient } from '@helpers/list-exam-to-domain';
import { ExamRepository } from '@repositories/exam-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListExamsToPatientUseCase {
	constructor(
    @inject('ExamRepository')
    private examRepository: ExamRepository
	) {}

	async execute(data: IListExams) {
		const exams = await this.examRepository.listToPatient(data);

		if (!exams) return null;

		const promise = exams.map((exam) => {
			return ListToPatient(exam);
		});

		return (await Promise.all(promise)).map((examsPatient) => {
			return examsPatient;
		});
	}
}
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
		const examsInfo = await this.examRepository.listToPatient(data);

		if (!examsInfo) return null;

		const {
			totalPage,
			total
		} = examsInfo;

		const promise = examsInfo.exams.map((exam) => {
			return ListToPatient(exam);
		});

		const examsToPatient = (await Promise.all(promise)).map((examsPatient) => {
			return examsPatient;
		});

		return {
			total,
			totalPage,
			examsToPatient
		};
	}
}
import { IListExams } from '@DTO/exam';
import { ExamRepository } from '@repositories/exam-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListExamsUseCase {
	constructor(
    @inject('ExamRepository')
    private examRepository: ExamRepository
	) {}

	async execute(data: IListExams) {
		const exams = await this.examRepository.listToDoctor(data);
	
		return exams;
	}
}
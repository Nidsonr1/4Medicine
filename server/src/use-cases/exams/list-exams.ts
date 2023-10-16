import { ExamRepository } from '@repositories/exam-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListExamsUseCase {
	constructor(
    @inject('ExamRepository')
    private examRepository: ExamRepository
	) {}

	async execute(customerId: string, order: string, search?: string) {
		const exams = await this.examRepository.list({
			customerId,
			order
		});
	
		return exams;
	}
}
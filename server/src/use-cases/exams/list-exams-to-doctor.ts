import { IListExams } from '@DTO/exam';
import { DoctorNotFound } from '@errors/doctor-error';
import { ListToDoctor } from '@helpers/list-exam-to-domain';
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

		const examsInfo = await this.examRepository.listToDoctor(
			data, 
			doctorExist.name
		);

		if (!examsInfo) return null;

		const {
			totalPage,
			total
		} = examsInfo;

		const promise = examsInfo.exams.map((exam) => {
			return ListToDoctor(exam);
		});

		const examsToDoctor = (await Promise.all(promise)).map(examsDoctor => {
			return examsDoctor;
		});

		return {
			total,
			totalPage,
			examsToDoctor
		};
	}
}
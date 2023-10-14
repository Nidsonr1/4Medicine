import { PrismaRegisterExam } from '@DTO/exam';
import { prisma } from '@lib/prisma';
import { ExamRepository } from '@repositories/exam-repository';


export class PrismaExamRepository implements ExamRepository {
	async create(data: PrismaRegisterExam): Promise<void> {
		console.log(data);

		await prisma.exams.create({
			data
		});
	}
  
}
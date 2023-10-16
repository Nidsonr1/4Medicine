import { ISharedExam, IListExams, IPrismaRegisterExam } from '@DTO/exam';
import { prisma } from '@lib/prisma';
import { Exams } from '@prisma/client';
import { ExamRepository } from '@repositories/exam-repository';
import { custom } from 'zod';


export class PrismaExamRepository implements ExamRepository {
	async sharedTo(data: ISharedExam): Promise<void> {
		await prisma.exams.update({
			where: {
				id: data.examId
			},
			data: {
				sharedBy: {
					push: data.doctorId
				}
			}
		});
	}

	async list(data: IListExams): Promise<Exams[] | null> {
		const exams = await prisma.exams.findMany({
			where: {
				OR: [
					{
						patient_id: data.customerId
					},
					{
						doctor_id: data.customerId
					},
					{
						sharedBy: {
							has: data.customerId
						}
					}
				]
			},
			include: {
				doctor: {
					select: {
						name: true
					}
				}
			},
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc'
			}
		});
		
		return exams;
	}
	async create(data: IPrismaRegisterExam): Promise<void> {
		await prisma.exams.create({
			data
		});
	}
  
}
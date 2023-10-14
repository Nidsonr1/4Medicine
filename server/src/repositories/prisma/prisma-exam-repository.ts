import { ListExams, PrismaRegisterExam } from '@DTO/exam';
import { prisma } from '@lib/prisma';
import { Exams } from '@prisma/client';
import { ExamRepository } from '@repositories/exam-repository';
import { custom } from 'zod';


export class PrismaExamRepository implements ExamRepository {
	async list(data: ListExams): Promise<Exams[] | null> {
		const exams = await prisma.exams.findMany({
			where: {
				OR: [
					{
						patient: {
							name: {
								contains: data.search,
								mode: 'insensitive'
							}
						}
					},
					{
						doctor: {
							name: {
								contains: data.search,
								mode: 'insensitive'
							}
						}
					},
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
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc'
			}
		});
		
		return exams;
	}
	async create(data: PrismaRegisterExam): Promise<void> {
		console.log(data);

		await prisma.exams.create({
			data
		});
	}
  
}
import { 
	ISharedExam, 
	IListExams, 
	IPrismaRegisterExam, 
	IListExamsToDoctor, 
	IListExamsToPatient, 
	IListExamSharedRequest
} from '@DTO/exam';
import { prisma } from '@lib/prisma';
import { Reports } from '@prisma/client';
import { ExamRepository } from '@repositories/exam-repository';

export class PrismaExamRepository implements ExamRepository {
	async create(data: IPrismaRegisterExam): Promise<void> {
		await prisma.exams.create({
			data: {
				document: data.document,
				doctor_id: data.doctor_id,
				patient_id: data.patient_id
			}
		});
	}

	async sharedTo(data: ISharedExam, doctorName: string): Promise<void> {
		await prisma.exams.update({
			where: {
				id: data.examId
			},
			data: {
				sharedBy: {
					push: doctorName
				}
			}
		});
	}

	async listShared(data: IListExamSharedRequest): Promise<Reports | null> {
		const report = await prisma.exams.findFirst({
			where: {
				id: data.examId,
				OR: [
					{
						sharedBy: {
							has: data.doctorName
						}
					},
					{
						doctor_id: data.doctorId
					}
				]
			}
		});

		return report;
	}

	async listToDoctor(data: IListExams, doctorName: string): Promise<IListExamsToDoctor[] | null> {
		const exams = await prisma.exams.findMany({
			where: {
				patient: {
					name: {
						contains: data.search,
						mode: 'insensitive'
					}
				},
				OR: [
					{
						doctor_id: data.customerId
					},
					{
						sharedBy: {
							has: doctorName
						}
					}
				]
			},
			select: {
				id: true,
				document: true,
				sharedBy: false,
				created_at: true,
				doctor_id: true,
				patient: {
					select: {
						id: true,
						name: true,
						dateOfBirth: true
					}
				}
			},
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc'
			}
		});
		
		return exams;
	}

	async listToPatient(data: IListExams): Promise<IListExamsToPatient[] | null> {
		const exams = await prisma.exams.findMany({
			where: {
				doctor: {
					name: {
						contains: data.search,
						mode: 'insensitive'
					}
				},
				OR: [
					{
						patient_id: data.customerId
					},
				]
			},
			select: {
				id: true,
				document: true,
				sharedBy: true,
				created_at: true,
				patient_id: true,
				doctor: {
					select: {
						id: true,
						name: true,
						expertise: true
					}
				}
			},
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc'
			}
		});

		return exams;
	}
}
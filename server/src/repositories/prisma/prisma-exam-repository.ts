import { 
	ISharedExam, 
	IListExams, 
	IPrismaRegisterExam, 
	IListExamsToDoctor, 
	IListExamsToPatient, 
	IListExamSharedRequest
} from '@DTO/exam';
import { prisma } from '@lib/prisma';
import { Exams } from '@prisma/client';
import { ExamRepository } from '@repositories/exam-repository';

export class PrismaExamRepository implements ExamRepository {
	async create(data: IPrismaRegisterExam): Promise<void> {
		await prisma.exams.create({
			data: {
				document: data.document,
				patient_id: data.patient_id,
				documentTitle: data.documentTitle
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

	async listShared(data: IListExamSharedRequest): Promise<Exams | null> {
		const exams = await prisma.exams.findFirst({
			where: {
				id: data.examId,
				OR: [
					{
						sharedBy: {
							has: data.doctorName
						}
					}
				]
			}
		});

		return exams;
	}

	async listToDoctor(data: IListExams, doctorName: string): Promise<IListExamsToDoctor | null> {
		const [exams, total] = await prisma.$transaction([
			prisma.exams.findMany({
				where: {
					patient: {
						name: {
							contains: data.search,
							mode: 'insensitive'
						}
					},
					OR: [
						{
							sharedBy: {
								has: doctorName
							}
						}
					]
				},
				select: {
					id: true,
					documentTitle: true,
					document: true,
					sharedBy: false,
					created_at: true,
					patient: {
						select: {
							id: true,
							name: true,
							dateOfBirth: true
						}
					}
				},
				take: data.take,
				skip: data.take,
				orderBy: {
					created_at: data.order === 'asc' ? 'asc' : 'desc'
				}
			}),

			prisma.exams.count()
		]);

		const totalPage = Math.ceil(total / data.take);

		return {
			total,
			totalPage,
			exams
		};
	}

	async listToPatient(data: IListExams): Promise<IListExamsToPatient | null> {
		const [exams, total] = await prisma.$transaction([
			prisma.exams.findMany({
				where: {
					OR: [
						{
							patient_id: data.customerId
						},
					]
				},
				select: {
					id: true,
					documentTitle: true,
					document: true,
					sharedBy: true,
					created_at: true,
					patient_id: true,
				},
				take: data.take,
				skip: data.take,
				orderBy: {
					created_at: data.order === 'asc' ? 'asc' : 'desc'
				}
			}),
			
			prisma.exams.count()
		]);
		
		const totalPage = Math.ceil( total/data.take );

		return {
			total,
			totalPage,
			exams
		};
	}
}
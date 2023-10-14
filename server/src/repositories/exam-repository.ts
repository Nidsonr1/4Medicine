import { ListExams, PrismaRegisterExam } from '@DTO/exam';
import { Exams } from '@prisma/client';


export interface ExamRepository {
  create(data: PrismaRegisterExam): Promise<void>;
  list(data: ListExams): Promise<Exams[] | null>
}
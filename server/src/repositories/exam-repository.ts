import { ISharedExam, IListExams, IPrismaRegisterExam } from '@DTO/exam';
import { Exams } from '@prisma/client';


export interface ExamRepository {
  create(data: IPrismaRegisterExam): Promise<void>;
  list(data: IListExams): Promise<Exams[] | null>
  sharedTo(data: ISharedExam): Promise<void>
}
import { PrismaRegisterExam } from '@DTO/exam';


export interface ExamRepository {
  create(data: PrismaRegisterExam): Promise<void>;
}
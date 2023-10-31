import { ISharedExam, IListExams, IPrismaRegisterExam, IListExamsToDoctor, IListExamsToPatient, IListExamSharedRequest } from '@DTO/exam';
import { Exams } from '@prisma/client';


export interface ExamRepository {
  create(data: IPrismaRegisterExam): Promise<void>;
  sharedTo(data: ISharedExam, doctorName: string): Promise<void>;
  listShared(data: IListExamSharedRequest): Promise<Exams | null>;
  listToDoctor(data: IListExams, doctorName: string): Promise<IListExamsToDoctor[] | null>;
  listToPatient(data: IListExams): Promise<IListExamsToPatient[] | null>;
}
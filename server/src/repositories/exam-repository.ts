import { Exams } from '@prisma/client';
import { 
	ISharedExam, 
	IListExams, 
	IPrismaRegisterExam, 
	IListExamsToDoctor, 
	IListExamsToPatient, 
	IListExamSharedRequest, 
	IUnshareExam
} from '@DTO/exam';


export interface ExamRepository {
  create(data: IPrismaRegisterExam): Promise<void>;
  sharedTo(data: ISharedExam, doctorName: string): Promise<void>;
	unshare(data: IUnshareExam): Promise<void>;
  listShared(data: IListExamSharedRequest): Promise<Exams | null>;
  listToDoctor(data: IListExams, doctorName: string): Promise<IListExamsToDoctor | null>;
  listToPatient(data: IListExams): Promise<IListExamsToPatient | null>;
}
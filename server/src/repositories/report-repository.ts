import { 
	IPrismaRegisterReport, 
	ISharedReports, 
	IListReportsRequest, 
	IListReportToDoctor, 
	IListReportToPatient, 
	ILIstReportsSharedRequest
} from '@DTO/report';
import { Reports } from '@prisma/client';

export interface ReportRepository {
  create(data: IPrismaRegisterReport): Promise<void>;
  sharedBy(data: ISharedReports, doctorName: string): Promise<void>;
  listShared(data: ILIstReportsSharedRequest): Promise<Reports | null>
  listToPatient(data: IListReportsRequest): Promise<IListReportToPatient[] | null>;
  listToDoctor(data: IListReportsRequest, doctorName: string): Promise<IListReportToDoctor[] | null>;
}
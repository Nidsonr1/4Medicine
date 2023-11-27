import { 
	IPrismaRegisterReport, 
	ISharedReports, 
	IListReportsRequest, 
	ILIstReportsSharedRequest,
	IListReportsToPatient,
	IListReportsToDoctor
} from '@DTO/report';
import { Reports } from '@prisma/client';

export interface ReportRepository {
  create(data: IPrismaRegisterReport): Promise<void>;
  sharedBy(data: ISharedReports, doctorName: string): Promise<void>;
  listShared(data: ILIstReportsSharedRequest): Promise<Reports | null>
  listToPatient(data: IListReportsRequest): Promise<IListReportsToPatient | null>;
  listToDoctor(data: IListReportsRequest, doctorName: string): Promise<IListReportsToDoctor | null>;
}
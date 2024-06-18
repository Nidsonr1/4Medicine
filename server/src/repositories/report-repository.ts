import { 
	IPrismaRegisterReport, 
	ISharedReports, 
	IListReportsRequest, 
	IListReportsSharedRequest,
	IListReportsToPatient,
	IListReportsToDoctor,
	IUnshareReports
} from '@DTO/report';
import { Reports } from '@prisma/client';

export interface ReportRepository {
  create(data: IPrismaRegisterReport): Promise<void>;
  sharedBy(data: ISharedReports, doctorName: string): Promise<void>;
	unshare(data: IUnshareReports): Promise<void>;
  listShared(data: IListReportsSharedRequest): Promise<Reports | null>
  listToPatient(data: IListReportsRequest): Promise<IListReportsToPatient | null>;
  listToDoctor(data: IListReportsRequest, doctorName: string): Promise<IListReportsToDoctor | null>;
}
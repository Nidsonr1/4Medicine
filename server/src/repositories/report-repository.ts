import { IPrismaRegisterReport, ISharedReports, IListReportsRequest, IListReportsResponse } from '@DTO/report';
import { Reports } from '@prisma/client';



export interface ReportRepository {
  create(data: IPrismaRegisterReport): Promise<void>;
  listToPatient(data: IListReportsRequest): Promise<Reports[] | null>;
  listToDoctor(data: IListReportsRequest): Promise<Reports[] | null>;
  sharedBy(data: ISharedReports): Promise<void>;
}
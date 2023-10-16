import { IPrismaRegisterReport, ISharedReports, IListReportsRequest } from '@DTO/report';
import { Reports } from '@prisma/client';



export interface ReportRepository {
  create(data: IPrismaRegisterReport): Promise<void>;
  listByCustomerId(data: IListReportsRequest): Promise<Reports[] | null>;
  sharedBy(data: ISharedReports): Promise<void>
}
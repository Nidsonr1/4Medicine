import { PrismaRegisterReport, listReportsRequest } from '@DTO/report';
import { Reports } from '@prisma/client';



export interface ReportRepository {
  create(data: PrismaRegisterReport): Promise<void>;
  listByCustomerId(data: listReportsRequest): Promise<Reports[] | null>;
}
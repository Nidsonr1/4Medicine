import { Agreement } from '@prisma/client';



export interface AgreementRepository {
  list(): Promise<Agreement[]>
}
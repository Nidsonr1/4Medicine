import { Doctor, Prisma} from '@prisma/client';

export interface DoctorRepository {
  create(data: Prisma.DoctorCreateInput): Promise<Doctor>;
  findByCRM(crm: string): Promise<Doctor | null>;
  listByAgreement(search: string): Promise<Doctor[]>
  findById(id: string): Promise<Doctor | null>
}
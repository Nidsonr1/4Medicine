import { RegisterDoctorRequest, UpdateDoctorRequest } from '@DTO/doctor';
import { Doctor } from '@prisma/client';

export interface DoctorRepository {
  create(data: RegisterDoctorRequest): Promise<Doctor>;
  findByCRM(crm: string): Promise<Doctor | null>;
  listByAgreement(search: string): Promise<Doctor[]>
  findById(id: string): Promise<Doctor | null>
  update(data: UpdateDoctorRequest, doctorId: string): Promise<Doctor>;
}
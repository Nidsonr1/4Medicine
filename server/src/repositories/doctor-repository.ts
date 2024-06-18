import { IRegisterDoctorRequest, IUpdateDoctorRequest } from '@DTO/doctor';
import { Doctor } from '@prisma/client';

export interface DoctorRepository {
  create(data: IRegisterDoctorRequest): Promise<Doctor>;
  findByCRM(crm: string): Promise<Doctor | null>;
  list(search?: string): Promise<Doctor[] | null>;
  findById(id: string): Promise<Doctor | null>;
  findByName(name: string): Promise<Doctor | null>;
  update(data: IUpdateDoctorRequest): Promise<Doctor>;
}
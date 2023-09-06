import { Patient, Prisma } from '@prisma/client';

export interface PatientRepository {
  findByCpf(cpf: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>
  create(data: Prisma.PatientCreateInput): Promise<void>;
  update(data: Prisma.PatientUpdateInput, id: string): Promise<Patient>;
}
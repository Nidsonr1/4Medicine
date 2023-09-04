import { Patient, Prisma } from '@prisma/client';

export interface PatientRepository {
  findByCpf(cpf: string): Promise<Patient | null>;
  create(data: Prisma.PatientCreateInput): Promise<void>;
}
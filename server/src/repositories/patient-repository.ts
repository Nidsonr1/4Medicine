import { RegisterPatientRequest, UpdatePatientRequest } from '@DTO/patient';
import { Patient } from '@prisma/client';

export interface PatientRepository {
  findByCpf(cpf: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>
  create(data: RegisterPatientRequest): Promise<void>;
  update(data: UpdatePatientRequest, id: string): Promise<Patient>;
}
import { IRegisterPatientRequest, IUpdatePatientRequest } from '@DTO/patient';
import { Patient } from '@prisma/client';

export interface PatientRepository {
  findByCpf(cpf: string): Promise<Patient | null>;
  findById(id: string): Promise<Patient | null>;
  findByEmail(email: string): Promise<Patient | null>
  create(data: IRegisterPatientRequest): Promise<void>;
  update(data: IUpdatePatientRequest, id: string): Promise<Patient>;
  list(search?: string):  Promise<Patient[] | null>
}
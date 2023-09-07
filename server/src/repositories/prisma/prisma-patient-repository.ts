import { Patient, Prisma } from '@prisma/client';
import { PatientRepository } from '../patient-repository';
import { prisma } from '../../lib/prisma';

export class PrismaPatientRepository implements PatientRepository {
	async findByEmail(email: string): Promise<Patient | null> {
		const patient = await prisma.patient.findFirst({
			where: {
				email
			}
		});

		return patient;
	}
	async findById(id: string): Promise<Patient | null> {
		const patient = await prisma.patient.findFirst({
			where: {
				id
			}
		});
		
		return patient;
	}
	async findByCpf(cpf: string): Promise<Patient | null> {
		const patient = await prisma.patient.findFirst({
			where: {
				cpf
			}
		});

		return patient;
	}
  
	async create(data: Prisma.PatientCreateInput): Promise<void> {
		await prisma.patient.create({
			data
		});
	}

	async update(data: Prisma.PatientUpdateInput, id: string): Promise<Patient> {
		const patient = await prisma.patient.update({
			where: {
				id
			},
			data
		});

		return patient;
	}
}
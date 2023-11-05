import { Patient } from '@prisma/client';
import { PatientRepository } from '../patient-repository';
import { prisma } from '../../lib/prisma';
import { IRegisterPatientRequest, IUpdatePatientRequest } from '@DTO/patient';

export class PrismaPatientRepository implements PatientRepository {
	async create(data: IRegisterPatientRequest): Promise<void> {
		await prisma.patient.create({
			data
		}); 
	}
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

	async update(data: IUpdatePatientRequest): Promise<Patient> {
		const patient = await prisma.patient.update({
			where: {
				id: data.patientId
			},
			data: {
				name: data.name,
				email: data.email,
				zipCode: data.zipCode,
				city: data.city,
				uf: data.uf,
				neighborhood: data.neighborhood,
				street: data.street,
				complement: data.complement,
				number: data.number,
				cell: data.cell,
			}
		});

		return patient;
	}

	async list(search?: string): Promise<Patient[] | null> {
		const patients = await prisma.patient.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive'
						}
					}
				]
			}
		});

		const result =  search
			? 
			patients
			:
			await prisma.patient.findMany();

		return result;
	}
}
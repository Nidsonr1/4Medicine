import { Patient, Prisma } from '@prisma/client';
import { PatientRepository } from '../patient-repository';
import { prisma } from '../../lib/prisma';
import { hash } from 'bcrypt';

export class PrismaPatientRepository implements PatientRepository {
	async findByCpf(cpf: string): Promise<Patient | null> {
		const patient = await prisma.patient.findFirst({
			where: {
				cpf
			}
		});

		return patient;
	}
  
	async create(data: Prisma.PatientCreateInput): Promise<void> {
		const passwordHash = await hash(data.password, 10);

		await prisma.patient.create({
			data: {
				name: data.name,
				cpf: data.cpf,
				email: data.email,
				password: passwordHash,
				color: data.color,
				birthdate: data.birthdate,
				motherName: data.motherName,
				fatherName: data.fatherName,
				bloodType: data.bloodType,
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
	}
}
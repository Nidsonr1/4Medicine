import { Doctor, Prisma } from '@prisma/client';

import { prisma } from '@lib/prisma';
import { DoctorRepository } from '@repositories/doctor-repository';



export class PrismaDoctorRepository implements DoctorRepository {
	async findById(id: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findFirst({
			where: {
				id
			}
		});

		return doctor;
	}
	async create(data: Prisma.DoctorCreateInput): Promise<Doctor> {
		const doctor = await prisma.doctor.create({
			data
		});

		return doctor;
	}

	async findByCRM(crm: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findFirst({
			where: {
				CRM: crm
			}
		});

		return doctor;
	}

	async listByAgreement(search: string): Promise<Doctor[]>{
		const doctors = await prisma.doctor.findMany({
			where: {
				agreement: {
					contains: search,
					mode: 'insensitive'
				},
			}
		});

		return doctors;
	}

}
import { Doctor } from '@prisma/client';

import { prisma } from '@lib/prisma';
import { DoctorRepository } from '@repositories/doctor-repository';
import { RegisterDoctorRequest, UpdateDoctorRequest } from '@DTO/doctor';

export class PrismaDoctorRepository implements DoctorRepository {
	async findById(id: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findFirst({
			where: {
				id
			}
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

	async create(data: RegisterDoctorRequest): Promise<Doctor> {
		const doctor = await prisma.doctor.create({
			data
		});

		return doctor;
	}

	async update(data: UpdateDoctorRequest, doctorId: string): Promise<Doctor> {
		const doctor = await prisma.doctor.update({
			where: {
				id: doctorId
			},
			data
		});

		return doctor;
	}

	async listByAgreementOrName(search?: string): Promise<Doctor[]>{
		const doctors = await prisma.doctor.findMany({
			where: {
				OR: [
					{
						agreement: {
							contains: search,
							mode: 'insensitive'
						}
					},
					{
						
						name: {
							contains: search,
							mode: 'insensitive'
						}
					}
				]
			}
		});

		const result = search 
			?
			doctors 
			:
			await prisma.doctor.findMany();

		return result;
	}

}
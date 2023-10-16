import { Doctor } from '@prisma/client';

import { prisma } from '@lib/prisma';
import { DoctorRepository } from '@repositories/doctor-repository';
import { IRegisterDoctorRequest, IUpdateDoctorRequest } from '@DTO/doctor';

export class PrismaDoctorRepository implements DoctorRepository {
	async findById(id: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findFirst({
			where: {
				id
			}
		});

		return doctor;
	}

	async findByCRM(CRM: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findFirst({
			where: {
				CRM
			}
		});

		return doctor;
	}

	async create(data: IRegisterDoctorRequest): Promise<Doctor> {
		const doctor = await prisma.doctor.create({
			data
		});

		return doctor;
	}

	async update(data: IUpdateDoctorRequest, doctorId: string): Promise<Doctor> {
		const doctor = await prisma.doctor.update({
			where: {
				id: doctorId
			},
			data
		});

		return doctor;
	}

	async list(search?: string): Promise<Doctor[] | null>{
		if (search) {
			const doctors = await prisma.doctor.findMany({
				where: {
					OR: [
						{
							agreement: {
								has: search,
							}
						},
						{
							name: {
								contains: search,
								mode: 'insensitive'
							}
						},
						{
							expertise: {
								has: search,
							}
						}
					]
				},
			});

			return doctors;
		} else  {
			const doctors = await prisma.doctor.findMany();
			return doctors;
		}
	}

}
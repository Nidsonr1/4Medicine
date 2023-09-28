import { PrismaRegisterReport, listReportsRequest } from '@DTO/report';
import { prisma } from '@lib/prisma';
import { Reports } from '@prisma/client';
import {  ReportRepository } from '@repositories/report-repository';

export class PrismaReportRepository implements ReportRepository {
	async create(data: PrismaRegisterReport): Promise<void> {
		await prisma.reports.create({
			data
		});
	}

	async listByCustomerId(data: listReportsRequest): Promise<Reports[] | null> {
		const reports = await prisma.reports.findMany({
			where: {
				patient: {
					name: {
						contains: data.search,
						mode: 'insensitive'
					}
				},
				OR: [
					{
						patient_id: data.customerId,
					},
					{
						doctor_id: data.customerId
					},
					{
						sharedBy: {
							has: data.customerId
						}
					},
				],
			},
			include: {
				patient: {
					select: {
						id: true,
						name: true,
						cpf: true,
						email: true,
						civilStatus: true,
						color: true,
						birthdate: true,
						motherName: true,
						fatherName: true,
						bloodType: true,
						zipCode: true,
						city: true,
						uf: true,
						neighborhood: true,
						street: true,
						complement: true,
						number: true,
						cell: true,
					}
				},
				doctor: {
					select: {
						id: true,
						name: true,
						CRM: true,
						expertise: true,
						cell: true,
						phone: true,
						agreement: true
					}
				}
			},
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc' 
			}
		});  

		return reports;
	}
}
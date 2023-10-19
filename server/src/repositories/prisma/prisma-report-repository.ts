import { IPrismaRegisterReport, ISharedReports, IListReportsRequest, IListReportsResponse } from '@DTO/report';
import { prisma } from '@lib/prisma';
import { Reports } from '@prisma/client';
import {  ReportRepository } from '@repositories/report-repository';

export class PrismaReportRepository implements ReportRepository {
	async sharedBy(data: ISharedReports): Promise<void> {
		await prisma.reports.update({
			where: {
				id: data.reportId
			},
			data: {
				sharedBy: {
					push: data.doctorId
				}
			}
		});
	}

	async create(data: IPrismaRegisterReport): Promise<void> {
		await prisma.reports.create({
			data
		});
	}

	async listToPatient(data: IListReportsRequest): Promise<Reports[] | null> {
		const reports = await prisma.reports.findMany({
			where: {
				doctor: {
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
				doctor: {
					select: {
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

	async listToDoctor(data: IListReportsRequest): Promise<Reports[] | null> {
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
					}
				},
				
			},
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc' 
			}
		});  

		return reports;
	}
}
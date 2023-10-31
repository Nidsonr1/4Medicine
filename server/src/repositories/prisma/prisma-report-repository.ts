import { 
	IPrismaRegisterReport, 
	ISharedReports, 
	IListReportsRequest,
	IListReportToDoctor, 
	IListReportToPatient, 
	ILIstReportsSharedRequest
} from '@DTO/report';
import { prisma } from '@lib/prisma';
import { Reports } from '@prisma/client';
import {  ReportRepository } from '@repositories/report-repository';

export class PrismaReportRepository implements ReportRepository {
	async create(data: IPrismaRegisterReport): Promise<void> {
		await prisma.reports.create({
			data
		});
	}

	async sharedBy(data: ISharedReports, doctorName: string): Promise<void> {
		await prisma.reports.update({
			where: {
				id: data.reportId
			},
			data: {
				sharedBy: {
					push: doctorName
				}
			}
		});
	}

	async listShared(data: ILIstReportsSharedRequest): Promise<Reports | null> {
		const report = await prisma.reports.findFirst({
			where: {
				id: data.reportId,
				OR: [
					{
						sharedBy: {
							has: data.doctorName
						}
					},
					{
						doctor_id: data.doctorId
					}
				]
			}
		});

		return report;
	}

	async listToPatient(data: IListReportsRequest): Promise<IListReportToPatient[] | null> {
		const reports = await prisma.reports.findMany({
			where: {
				doctor: {
					name: {
						contains: data.search,
						mode: 'insensitive'
					}
				},
				patient_id: data.customerId
			},
			select: {
				id: true,
				document: true,
				sharedBy: true,
				created_at: true,
				patient_id: true,
				doctor: {
					select: {
						id: true,
						name: true,
						expertise: true,
					}
				}
			},
			orderBy: {
				created_at: data.order === 'asc' ? 'asc' : 'desc' 
			}
		});  

		return reports;
	}

	async listToDoctor(data: IListReportsRequest, doctorName: string): Promise<IListReportToDoctor[] | null> {
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
						doctor_id: data.customerId
					},
					{
						sharedBy: {
							has: doctorName
						}
					},
				],
			},
			select: {
				id: true,
				document: true,
				created_at: true,
				doctor_id: true,
				patient: {
					select: {
						id: true,
						name: true,
						dateOfBirth: true
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
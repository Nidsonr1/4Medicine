import { prisma } from '@lib/prisma';
import { Agreement } from '@prisma/client';
import { AgreementRepository } from '@repositories/agreement-repository';



export class PrismaAgreementRepository implements AgreementRepository {
	async list(): Promise<Agreement[]> {
		const agreements = await prisma.agreement.findMany({
			orderBy: {
				name: 'asc'
			}
		});

		return agreements;
	}
}
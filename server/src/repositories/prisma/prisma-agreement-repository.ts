import { prisma } from '@lib/prisma';
import { AgreementRepository } from '@repositories/agreement-repository';



export class PrismaAgreementRepository implements AgreementRepository {
	async list(): Promise<{ id: string; name: string; }[]> {
		const agreements = await prisma.agreement.findMany({
			orderBy: {
				name: 'asc'
			}
		});

		return agreements;
	}
}
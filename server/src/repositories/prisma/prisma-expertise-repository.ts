import { prisma } from '@lib/prisma';
import { ExpertiseRepository } from '@repositories/expertise-repository';



export class PrismaExpertiseRepository implements ExpertiseRepository {
	async list(): Promise<{ id: string; name: string; }[]> {
		const expertises = await prisma.expertise.findMany({
			orderBy: {
				name: 'asc'
			}
		});

		return expertises;
	}
  
}
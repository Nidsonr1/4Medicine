import { prisma } from '@lib/prisma';
import { Expertise } from '@prisma/client';
import { ExpertiseRepository } from '@repositories/expertise-repository';



export class PrismaExpertiseRepository implements ExpertiseRepository {
	async list(): Promise<Expertise[]> {
		const expertises = await prisma.expertise.findMany({
			orderBy: {
				name: 'asc'
			}
		});

		return expertises;
	}
  
}
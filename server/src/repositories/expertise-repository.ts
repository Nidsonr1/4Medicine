import { Expertise } from '@prisma/client';

export interface ExpertiseRepository {
  list(): Promise<Expertise[]>
}
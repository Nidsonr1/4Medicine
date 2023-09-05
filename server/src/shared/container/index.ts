import { container } from 'tsyringe';

import { PatientRepository } from '../../repositories/patient-repository';
import { PrismaPatientRepository } from '../../repositories/prisma/prisma-patient-repository';

container.registerSingleton<PatientRepository>('PatientRepository', PrismaPatientRepository);
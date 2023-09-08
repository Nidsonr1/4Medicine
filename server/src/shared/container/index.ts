import { container } from 'tsyringe';

import { PatientRepository } from '../../repositories/patient-repository';
import { PrismaPatientRepository } from '../../repositories/prisma/prisma-patient-repository';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PrismaDoctorRepository } from '@repositories/prisma/prisma-doctor-repository';

container.registerSingleton<PatientRepository>('PatientRepository', PrismaPatientRepository);
container.registerSingleton<DoctorRepository>('DoctorRepository', PrismaDoctorRepository);
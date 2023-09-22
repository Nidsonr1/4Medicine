import { container } from 'tsyringe';

import { PatientRepository } from '../../repositories/patient-repository';
import { PrismaPatientRepository } from '../../repositories/prisma/prisma-patient-repository';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PrismaDoctorRepository } from '@repositories/prisma/prisma-doctor-repository';
import { ReportRepository } from '@repositories/report-repository';
import { PrismaReportRepository } from '@repositories/prisma/prisma-report-repository';

container.registerSingleton<PatientRepository>('PatientRepository', PrismaPatientRepository);
container.registerSingleton<DoctorRepository>('DoctorRepository', PrismaDoctorRepository);
container.registerSingleton<ReportRepository>('ReportRepository', PrismaReportRepository);
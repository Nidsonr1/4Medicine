import { Router } from 'express';
import { patientRoutes } from './patient.routes';
import { doctorRoutes } from './doctor.routes';
import { reportRoutes } from './report.routes';

export const routes = Router();

routes.use('/patient', patientRoutes);
routes.use('/doctor', doctorRoutes);
routes.use('/report', reportRoutes);
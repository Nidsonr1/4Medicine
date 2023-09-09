import { Router } from 'express';
import { patientRoutes } from './patient.routes';
import { doctorRoutes } from './doctor.routes';

export const routes = Router();

routes.use('/patient', patientRoutes);
routes.use('/doctor', doctorRoutes);
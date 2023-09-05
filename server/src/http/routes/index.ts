import { Router } from 'express';
import { patientRoutes } from './patient.routes';

export const routes = Router();

routes.use('/patient', patientRoutes);
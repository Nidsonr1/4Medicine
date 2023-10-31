import { Router } from 'express';
import { patientRoutes } from './patient.routes';
import { doctorRoutes } from './doctor.routes';
import { appointmentRoutes } from './appointment.routes';
import { expertiseRoutes } from './expertise.routes';
import { agreementRoutes } from './agreement.routes';

export const routes = Router();

routes.use('/patient', patientRoutes);
routes.use('/doctor', doctorRoutes);
routes.use('/appointment', appointmentRoutes);
routes.use('/expertises', expertiseRoutes);
routes.use('/agreements', agreementRoutes);

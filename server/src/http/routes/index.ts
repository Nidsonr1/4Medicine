import { Router } from 'express';
import { patientRoutes } from './patient.routes';
import { doctorRoutes } from './doctor.routes';
import { reportRoutes } from './report.routes';
import { appointmentRoutes } from './appointment.routes';
import { examRoutes } from './exam.routes';
import { expertiseRoutes } from './expertise.routes';
import { agreementRoutes } from './agreement.routes';

export const routes = Router();

routes.use('/patient', patientRoutes);
routes.use('/doctor', doctorRoutes);
routes.use('/report', reportRoutes);
routes.use('/appointment', appointmentRoutes);
routes.use('/exams', examRoutes);
routes.use('/expertises', expertiseRoutes);
routes.use('/agreements', agreementRoutes);

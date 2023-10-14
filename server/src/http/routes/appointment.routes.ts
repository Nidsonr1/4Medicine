import { Router } from 'express';

import { RegisterAppointmentController } from 'http/controllers/appointment/register-appointment';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

export const appointmentRoutes = Router();

const registerAppointmentController =  new RegisterAppointmentController();

appointmentRoutes.post(
	'/create',
	EnsureAuthenticatePatient, 
	registerAppointmentController.handle
);
import { Router } from 'express';

import { RegisterAppointmentController } from 'http/controllers/appointment/register-appointment';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';

export const appointmentRoutes = Router();

const registerAppointmentController =  new RegisterAppointmentController();

appointmentRoutes.post(
	'/create',
	EnsureAuthenticateDoctor, 
	registerAppointmentController.handle
);
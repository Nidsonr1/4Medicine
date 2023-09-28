import { Router } from 'express';
import { ListAppointmentController } from 'http/controllers/appointment/list-appointment';
import { RegisterAppointmentController } from 'http/controllers/appointment/register-appointment';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

export const appointmentRoutes = Router();

const registerAppointmentController =  new RegisterAppointmentController();
const listAppointmentController = new ListAppointmentController();

appointmentRoutes.post(
	'/create',
	EnsureAuthenticatePatient, 
	registerAppointmentController.handle);

appointmentRoutes.get(
	'/list',
	EnsureAuthenticateDoctor,
	EnsureAuthenticatePatient,
	listAppointmentController.handle
);
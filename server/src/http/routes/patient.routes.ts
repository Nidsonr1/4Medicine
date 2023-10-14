import { Router } from 'express';

import { RegisterPatientController } from '../controllers/patients/register-patient';
import { InfoPatientController } from '../controllers/patients/info-patient';
import { LoginPatientController } from 'http/controllers/patients/login-patient';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';
import { UpdatePatientController } from 'http/controllers/patients/update-patient';
import { ListReportsByPatientController } from 'http/controllers/patients/list-reports';
import { ListAppointmentPatientController } from 'http/controllers/patients/list-appointment';

export const patientRoutes = Router();

const registerPatientController = new RegisterPatientController();
const infoPatientController = new InfoPatientController();
const loginPatientcontroller = new LoginPatientController();
const updatePatientController = new UpdatePatientController();
const listReportsByPatientController = new ListReportsByPatientController();
const listAppointmentController = new ListAppointmentPatientController();

patientRoutes.post('/create', registerPatientController.handle);
patientRoutes.get(
	'/',
	EnsureAuthenticatePatient,
	infoPatientController.handle
);
patientRoutes.post('/login', loginPatientcontroller.handle);
patientRoutes.put(
	'/update',
	EnsureAuthenticatePatient,
	updatePatientController.handle
);
patientRoutes.get(
	'/reports',
	EnsureAuthenticatePatient,
	listReportsByPatientController.handle
);
patientRoutes.get(
	'/appointments',
	EnsureAuthenticatePatient,
	listAppointmentController.handle
);

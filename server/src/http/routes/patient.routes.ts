import { Router } from 'express';

import { RegisterPatientController } from '../controllers/patients/register-patient';
import { InfoPatientController } from '../controllers/patients/info-patient';
import { LoginPatientController } from 'http/controllers/patients/login-patient';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';
import { UpdatePatientController } from 'http/controllers/patients/update-patient';

export const patientRoutes = Router();

const registerPatientController = new RegisterPatientController();
const infoPatientController = new InfoPatientController();
const loginPatientcontroller = new LoginPatientController();
const updatePatientController = new UpdatePatientController();

patientRoutes.post('/create', registerPatientController.handle);
patientRoutes.get('/', EnsureAuthenticatePatient, infoPatientController.handle);
patientRoutes.post('/login', loginPatientcontroller.handle);
patientRoutes.put('/update', EnsureAuthenticatePatient, updatePatientController.handle);

import { Router } from 'express';
import { InfoDoctorController } from 'http/controllers/doctor/info-doctor';
import { ListDoctorsController } from 'http/controllers/doctor/list-doctors';
import { LoginDoctorController } from 'http/controllers/doctor/login-doctor';
import { RegisterDoctorController } from 'http/controllers/doctor/register-doctor';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

export const doctorRoutes = Router();

const registerDoctorController = new RegisterDoctorController();
const listDoctorsController = new ListDoctorsController();
const infoDoctorController = new InfoDoctorController();
const loginDoctorController = new LoginDoctorController();

doctorRoutes.post('/create', registerDoctorController.handle);
doctorRoutes.post('/login', loginDoctorController.handle);
doctorRoutes.get(
	'/list', 
	EnsureAuthenticatePatient, 
	EnsureAuthenticateDoctor, 
	listDoctorsController.handle
);
doctorRoutes.get(
	'/info/:doctorId',
	EnsureAuthenticatePatient,
	EnsureAuthenticateDoctor,
	infoDoctorController.handle
);

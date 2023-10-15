import { Router } from 'express';
import { InfoDoctorController } from 'http/controllers/doctor/info-doctor';
import { ListAppointmentsDoctorController } from 'http/controllers/doctor/list-appointment';
import { ListDoctorsController } from 'http/controllers/doctor/list-doctors';
import { ListExamsDoctorController } from 'http/controllers/doctor/list-exams';
import { ListPatientsController } from 'http/controllers/doctor/list-patients';
import { ListReportByDoctorController } from 'http/controllers/doctor/list-report';
import { LoginDoctorController } from 'http/controllers/doctor/login-doctor';
import { RegisterDoctorController } from 'http/controllers/doctor/register-doctor';
import { UpdateDoctorController } from 'http/controllers/doctor/update-doctor';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

export const doctorRoutes = Router();

const registerDoctorController = new RegisterDoctorController();
const listDoctorsController = new ListDoctorsController();
const infoDoctorController = new InfoDoctorController();
const loginDoctorController = new LoginDoctorController();
const updateDoctorController = new UpdateDoctorController();
const listReportsByDoctorController = new ListReportByDoctorController(); 
const listPatientsController = new ListPatientsController();
const listAppointmentsController = new ListAppointmentsDoctorController();
const listExamsController = new ListExamsDoctorController();

doctorRoutes.post('/create', registerDoctorController.handle);
doctorRoutes.post('/login', loginDoctorController.handle);
doctorRoutes.get(
	'/list', 
	listDoctorsController.handle
);
doctorRoutes.get(
	'/info/:doctorId',
	EnsureAuthenticatePatient,
	EnsureAuthenticateDoctor,
	infoDoctorController.handle
);
doctorRoutes.put(
	'/update',
	EnsureAuthenticateDoctor,
	updateDoctorController.handle
);
doctorRoutes.get(
	'/reports', 
	EnsureAuthenticateDoctor, 
	listReportsByDoctorController.handle
);
doctorRoutes.get(
	'/patients',
	EnsureAuthenticateDoctor,
	listPatientsController.handle
);
doctorRoutes.get(
	'/appointments',
	EnsureAuthenticateDoctor,
	listAppointmentsController.handle
);
doctorRoutes.get(
	'/exams',
	EnsureAuthenticateDoctor,
	listExamsController.handle
);
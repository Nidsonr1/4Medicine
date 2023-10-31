import { Router } from 'express';
import multer from 'multer';

import { InfoDoctorController } from '@controllers/doctor/info-doctor';
import { ListAppointmentsDoctorController } from '@controllers/doctor/list-appointment';
import { ListDoctorsController } from '@controllers/doctor/list-doctors';
import { ListPatientsController } from '@controllers/doctor/list-patients';
import { ListReportsToDoctorController } from '@controllers/report/list-reports-to-doctor';
import { LoginDoctorController } from '@controllers/doctor/login-doctor';
import { RegisterDoctorController } from '@controllers/doctor/register-doctor';
import { UpdateDoctorController } from '@controllers/doctor/update-doctor';

import { RegisterReportController } from '@controllers/report/register-report';

import { ListExamsDoctorController } from '@controllers/exam/list-exam-to-doctor';

import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

import { storage } from '@helpers/upload';

const uploadFile = multer({ storage: storage });
export const doctorRoutes = Router();

const registerDoctorController = new RegisterDoctorController();
const listDoctorsController = new ListDoctorsController();
const infoDoctorController = new InfoDoctorController();
const loginDoctorController = new LoginDoctorController();
const updateDoctorController = new UpdateDoctorController();
const listPatientsController = new ListPatientsController();
const listAppointmentsController = new ListAppointmentsDoctorController();
const listExamsController = new ListExamsDoctorController();
const listReportsController = new ListReportsToDoctorController();
const registerReportController = new RegisterReportController();

//Doctor's Routes
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
	'/patients',
	EnsureAuthenticateDoctor,
	listPatientsController.handle
);
doctorRoutes.get(
	'/appointments',
	EnsureAuthenticateDoctor,
	listAppointmentsController.handle
);

//Exam's Routes
doctorRoutes.get(
	'/exams',
	EnsureAuthenticateDoctor,
	listExamsController.handle
);

//Report's Routes
doctorRoutes.post(
	'/reports/create',
	uploadFile.single('file'),
	EnsureAuthenticateDoctor,
	registerReportController.handle
);

doctorRoutes.get(
	'/reports',
	EnsureAuthenticateDoctor,
	listReportsController.handle
);
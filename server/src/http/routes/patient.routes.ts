import { Router } from 'express';
import multer from 'multer';

import { RegisterPatientController } from '@controllers/patients/register-patient';
import { InfoPatientController } from '@controllers/patients/info-patient';
import { LoginPatientController } from '@controllers/patients/login-patient';
import { UpdatePatientController } from '@controllers/patients/update-patient';
import { ListReportsToPatientController } from '@controllers/report/list-reports-to-patient';
import { ListAppointmentPatientController } from '@controllers/patients/list-appointment';
import { SharedReportController } from '@controllers/report/shared-reports';
import { SharedExamsController } from '@controllers/exam/shared-exam';

import { RegisterExamController } from '@controllers/exam/register-exam';
import { ListExamsPatientController } from '@controllers/exam/list-exam-to-patient';

import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

import { storage } from '@helpers/upload';

export const patientRoutes = Router();

const registerPatientController = new RegisterPatientController();
const infoPatientController = new InfoPatientController();
const loginPatientcontroller = new LoginPatientController();
const updatePatientController = new UpdatePatientController();
const listReportsByPatientController = new ListReportsToPatientController();
const listAppointmentController = new ListAppointmentPatientController();
const listExamsController = new ListExamsPatientController();
const sharedReportController = new SharedReportController();
const sharedExamController = new SharedExamsController();
const registerExamController = new RegisterExamController();

const uploadFile = multer({ storage: storage });

//Patient's Routes
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

//Exam's Routes
patientRoutes.post(
	'/exams/upload',
	uploadFile.single('file'),
	EnsureAuthenticatePatient,
	registerExamController.handle
);
patientRoutes.get(
	'/exams',
	EnsureAuthenticatePatient,
	listExamsController.handle
);
patientRoutes.patch(
	'/exams/shared/:examId',
	EnsureAuthenticatePatient,
	sharedExamController.handle
);

//Report's Routes
patientRoutes.patch(
	'/reports/shared/:reportId',
	EnsureAuthenticatePatient,
	sharedReportController.handle
);
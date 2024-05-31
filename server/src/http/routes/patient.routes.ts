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
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { ListPatientsController } from '@controllers/doctor/list-patients';
import { UnshareExamController } from '@controllers/exam/unshare-exam';

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
const searchPatients = new ListPatientsController();
const unshareExamController = new UnshareExamController();

const uploadFile = multer({ storage: storage });

//Patient's Routes
patientRoutes.post('/create', registerPatientController.handle);

patientRoutes.get(
	'/info/:patientId',
	EnsureAuthenticatePatient,
	infoPatientController.handle
);

patientRoutes.get(
	'/search',
	EnsureAuthenticateDoctor,
	searchPatients.handle
);

patientRoutes.post('/login', loginPatientcontroller.handle);

patientRoutes.put(
	'/update',
	EnsureAuthenticatePatient,
	updatePatientController.handle
);

//Appointment's Routes
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

patientRoutes.patch(
	'/exams/unshared/:examId',
	EnsureAuthenticatePatient,
	unshareExamController.handle
);

//Report's Routes
patientRoutes.patch(
	'/reports/shared/:reportId',
	EnsureAuthenticatePatient,
	sharedReportController.handle
);

patientRoutes.get(
	'/reports',
	EnsureAuthenticatePatient,
	listReportsByPatientController.handle
);
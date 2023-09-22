import { Router } from 'express';
import { RegisterReportController } from 'http/controllers/report/register-report';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

export const reportRoutes = Router();

const registerReportController = new RegisterReportController();

reportRoutes.post(
	'/create', 
	EnsureAuthenticateDoctor,
	registerReportController.handle
);
import { Router } from 'express';
import { RegisterExamController } from 'http/controllers/exam/register-exam';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';

export const examRoutes = Router();

const registerExamController = new RegisterExamController();

examRoutes.post(
	'/create',
	EnsureAuthenticatePatient,
	registerExamController.handle
);
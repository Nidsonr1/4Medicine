import { Router } from 'express';
import multer from 'multer';

import { RegisterExamController } from 'http/controllers/exam/register-exam';
import { EnsureAuthenticatePatient } from 'middlewares/ensureAuthenticatePatient';
import { storage } from '../../lib/upload';

export const examRoutes = Router();

const uploadFile = multer({ storage: storage });
const registerExamController = new RegisterExamController();

examRoutes.post(
	'/create',
	uploadFile.single('file'),
	EnsureAuthenticatePatient,
	registerExamController.handle
);
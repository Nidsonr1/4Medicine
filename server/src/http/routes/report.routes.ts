import { Router } from 'express';
import multer from 'multer';

import { RegisterReportController } from 'http/controllers/report/register-report';
import { EnsureAuthenticateDoctor } from 'middlewares/ensureAuthenticateDoctor';
import { storage } from '../../lib/upload';

export const reportRoutes = Router();

const uploadFile = multer({ storage: storage });
const registerReportController = new RegisterReportController();

reportRoutes.post(
	'/create', 
	uploadFile.single('file'),
	EnsureAuthenticateDoctor,
	registerReportController.handle
);
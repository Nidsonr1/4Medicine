import { Router } from 'express';
import { RegisterPatientController } from '../controllers/register-patient';

export const patientRoutes = Router();

const registerPatientController = new RegisterPatientController();

patientRoutes.post('/create', registerPatientController.handle);
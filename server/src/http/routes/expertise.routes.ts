import { Router } from 'express';
import { ListExpertiseController } from 'http/controllers/expertises/list-expertises';

export const expertiseRoutes = Router();

const listExpertiseController = new ListExpertiseController();

expertiseRoutes.get('/list', listExpertiseController.handle);
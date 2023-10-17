import { Router } from 'express';
import { ListAgreementController } from 'http/controllers/agreement/list-agreement';

export const agreementRoutes = Router();

const listAgreementController = new ListAgreementController();

agreementRoutes.get('/list', listAgreementController.handle);
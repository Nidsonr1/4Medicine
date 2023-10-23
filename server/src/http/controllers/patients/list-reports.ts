import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { listReportsSchema } from '@lib/zod';
import { ListReportsUseCase } from 'use-cases/report/list-reports';

export class ListReportsByPatientController {
	async handle(request: Request, response: Response) {
		const listReportsUseCase = container.resolve(ListReportsUseCase);

		const { patientId } = request;
		const { order, search } = request.query;

		const validateBody = {
			customerId: patientId,
			order
		};

		const listReportsRequest = listReportsSchema.parse(validateBody);

		const result = await listReportsUseCase.execute(listReportsRequest);

		return response.json(result);
	}
}
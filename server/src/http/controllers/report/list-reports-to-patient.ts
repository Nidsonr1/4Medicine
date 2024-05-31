import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { listReportsSchema } from '@lib/zod';
import { ListReportsToPatientUseCase } from 'use-cases/report/list-reports-to-patient';

export class ListReportsToPatientController {
	async handle(request: Request, response: Response) {
		const listReportsToPatientUseCase = container.resolve(ListReportsToPatientUseCase);

		const { patientId } = request;
		const { 
			order, 
			search, 
			offset, 
			limit 
		} = request.query;

		const validateBody = {
			customerId: patientId,
			order,
			search,
			offset,
			limit
		};

		const listReportsRequest = listReportsSchema.parse(validateBody);

		const result = await listReportsToPatientUseCase.execute(listReportsRequest);

		return response.json(result);
	}
}
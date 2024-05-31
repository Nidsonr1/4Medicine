import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListExamsToPatientUseCase } from 'use-cases/exams/list-exams-to-patients';
import { listExamsSchema } from '@lib/zod';

export class ListExamsPatientController {
	async handle(request: Request, response: Response) {
		const listExamUseCase = container.resolve(ListExamsToPatientUseCase);

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

		const listExamsRequest = listExamsSchema.parse(validateBody);

		const result = await listExamUseCase.execute(listExamsRequest);
			
		return response.json(result);
	}
}
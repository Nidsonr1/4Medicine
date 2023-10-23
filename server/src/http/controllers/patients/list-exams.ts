import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListExamsUseCase } from 'use-cases/exams/list-exams';
import { listExamsSchema } from '@lib/zod';

export class ListExamsPatientController {
	async handle(request: Request, response: Response) {
		const listExamUseCase = container.resolve(ListExamsUseCase);

		const { patientId } = request;
		const { order } = request.query;

		const validateBody = {
			customerId: patientId,
			order
		};

		const listExamsRequest = listExamsSchema.parse(validateBody);

		const result = await listExamUseCase.execute(listExamsRequest);
			
		return response.json(result);
	}
}
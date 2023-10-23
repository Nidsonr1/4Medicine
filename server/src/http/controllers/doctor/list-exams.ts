import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListExamsUseCase } from 'use-cases/exams/list-exams';
import { listExamsSchema } from '@lib/zod';

export class ListExamsDoctorController {
	async handle(request: Request, response: Response) {
		const listExamUseCase = container.resolve(ListExamsUseCase);

		const { doctorId } = request;
		const { order } = request.query;

		const validateBody = {
			customerId: doctorId,
			order
		};

		const listExamsRequest = listExamsSchema.parse(validateBody);

		const result = await listExamUseCase.execute(listExamsRequest);
			
		return response.json(result);
	}
}
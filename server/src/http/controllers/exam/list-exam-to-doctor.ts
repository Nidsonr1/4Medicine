import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListExamsToDoctorUseCase } from 'use-cases/exams/list-exams-to-doctor';
import { listExamsSchema } from '@lib/zod';

export class ListExamsDoctorController {
	async handle(request: Request, response: Response) {
		const listExamUseCase = container.resolve(ListExamsToDoctorUseCase);

		const { doctorId } = request;
		const { 
			order,
			search,
			take,
			skip
		} = request.query;

		const validateBody = {
			customerId: doctorId,
			order,
			search,
			take,
			skip,
		};

		const listExamsRequest = listExamsSchema.parse(validateBody);

		const result = await listExamUseCase.execute(listExamsRequest);
			
		return response.json(result);
	}
}
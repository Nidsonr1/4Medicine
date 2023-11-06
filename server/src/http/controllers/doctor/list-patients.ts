import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPatientsUseCase } from 'use-cases/patient/list-patients';
import { listPatientsSchema } from '@lib/zod';

export class ListPatientsController {
	async handle(request: Request, response: Response) {
		const listPatientsUseCase = container.resolve(ListPatientsUseCase);
		
		const { search } = request.query;
		const { doctorId } = request;

		const validateBody = {
			search,
			doctorId
		};

		const listPatientsRequest = listPatientsSchema.parse(validateBody);

		const result = await listPatientsUseCase.execute(listPatientsRequest);

		return response.json(result);
	}
}

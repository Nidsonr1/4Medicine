import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListExpertiseUseCase } from 'use-cases/expertise/list-expertise';

export class ListExpertiseController {
	async handle(_: Request, response: Response) {
		const listExpertiseUseCase = container.resolve(ListExpertiseUseCase);

		const result = await listExpertiseUseCase.execute();

		return response.json(result);
	}
}
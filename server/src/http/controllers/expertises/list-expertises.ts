import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListExpertiseUseCase } from 'use-cases/expertise/list-expertise';



export class ListExpertiseController {
	async handle(request: Request, response: Response) {
		const listExpertiseUseCase = container.resolve(ListExpertiseUseCase);

		try {
			const result = await listExpertiseUseCase.execute();

			return response.json(result);
		} catch (error) {
			if (error instanceof Error) {
				return response.status(500).send();
			}
		}
	}
}
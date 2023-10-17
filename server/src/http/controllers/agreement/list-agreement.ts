import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAgreementUseCase } from 'use-cases/agreement/list-agreement';

export class ListAgreementController {
	async handle(_: Request, response: Response) {
		const listAgreementUseCase = container.resolve(ListAgreementUseCase);
		
		try {
			const result = await listAgreementUseCase.execute();

			return response.json(result);
		} catch (error) {
			if (error instanceof Error) {
				return response.status(500).send();
			}
		}
	}
}
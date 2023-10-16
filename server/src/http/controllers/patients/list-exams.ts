import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListExamsUseCase } from 'use-cases/exams/list-exams';

export class ListExamsPatientController {
	async handle(request: Request, response: Response) {
		const listExamUseCase = container.resolve(ListExamsUseCase);
		const { patientId } = request;
		const { order } = request.query;

		try {
			const result = await listExamUseCase.execute(
				patientId,
        order as string
			);
			
			return response.json({
				result
			});
		} catch (error) {
			if ( error instanceof Error ) {
				return response.status(500).json({
					message: error.message
				});
			}
		}
	}
}
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListExamsUseCase } from 'use-cases/exams/list-exams';

export class ListExamsDoctorController {
	async handle(request: Request, response: Response) {
		const listExamUseCase = container.resolve(ListExamsUseCase);
		
		const { doctorId } = request;
		const { order, search } = request.query;

		try {
			const result = listExamUseCase.execute(
				doctorId,
        order as string,
        search as string
			);
      
			return response.json({
				result
			});
		} catch (error) {
			if (error instanceof Error) {
				return response.status(500).json({
					message: error.message
				});
			}
		}
	}
}
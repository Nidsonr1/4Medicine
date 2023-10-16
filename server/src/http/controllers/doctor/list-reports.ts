import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListReportsUseCase } from 'use-cases/report/list-reports';

export class ListReportsByDoctorController {
	async handle(request: Request, response: Response) {
		const listReports = container.resolve(ListReportsUseCase);

		const { doctorId } = request;
		const { order, search } = request.query;

		try {
			const result = await listReports.execute(
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
					error: error.message
				});
			}
		}
	}
}
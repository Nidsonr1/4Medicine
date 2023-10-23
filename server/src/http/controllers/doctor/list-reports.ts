import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { listReportsSchema } from '@lib/zod';
import { ListReportsUseCase } from 'use-cases/report/list-reports';

export class ListReportsByDoctorController {
	async handle(request: Request, response: Response) {
		const listReports = container.resolve(ListReportsUseCase);

		const { doctorId } = request;
		const { order, search } = request.query;

		const validateBody = {
			customerId: doctorId,
			order,
			search
		};

		const listReportRequest = listReportsSchema.parse(validateBody);
		
		const result = await listReports.execute(listReportRequest);

		return response.json(result);
	}
}
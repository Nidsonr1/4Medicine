import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { listReportsSchema } from '@lib/zod';
import { ListReportsToDoctorUseCase } from 'use-cases/report/list-reports-to-doctor';

export class ListReportsToDoctorController {
	async handle(request: Request, response: Response) {
		const listReports = container.resolve(ListReportsToDoctorUseCase);

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
			skip
		};

		const listReportRequest = listReportsSchema.parse(validateBody);
		
		const result = await listReports.execute(listReportRequest);

		return response.json(result);
	}
}
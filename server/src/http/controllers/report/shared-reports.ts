import { sharedReportsSchema } from '@lib/zod';
import { SharedReportsUseCase } from '@use-cases/report/shared-reports';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SharedReportController {
	async handle(request: Request, response: Response) {
		const sharedReportUseCase = container.resolve(SharedReportsUseCase);

		const { doctorId } = request.body;
		const { patientId } = request;
		const { reportId } = request.params;

		const validateBody = {
			doctorId,
			patientId,
			reportId
		};

		const sharedReportRequest = sharedReportsSchema.parse(validateBody);

		await sharedReportUseCase.execute(sharedReportRequest);

		return response.json({
			message: 'Laudo compartilhado com sucesso!'
		});
	}
}
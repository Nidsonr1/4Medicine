import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { unsharedReportsSchema } from '@lib/zod';
import { UnsharedReportsUseCase } from '@use-cases/report/unshare-reports';

export class UnsharedReportsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const unshareReportUseCase = container.resolve(UnsharedReportsUseCase);

		const { doctorName } = request.body;
		const { patientId } = request;
		const { reportId } = request.params;

		const validateBody = {
			doctorName,
			patientId,
			reportId
		};

		const payload = unsharedReportsSchema.parse(validateBody);

		await unshareReportUseCase.execute(payload);

		return response.json({
			message: 'Compartilhamento excluído com sucesso!'
		});
	}
}
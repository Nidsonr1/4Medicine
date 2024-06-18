import { sharedReportsSchema } from '@lib/zod';
import { UnsharedReportsUseCase } from '@use-cases/report/unshare-reports';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UnsharedReportsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const unshareReportUseCase = container.resolve(UnsharedReportsUseCase);

		const { doctorId } = request.body;
		const { patientId } = request;
		const { reportId } = request.params;

		const validateBody = {
			doctorId,
			patientId,
			reportId
		};

		const payload = sharedReportsSchema.parse(validateBody);

		await unshareReportUseCase.execute(payload);

		return response.json({
			message: 'Compartilhamento excluído com sucesso!'
		});
	}
}
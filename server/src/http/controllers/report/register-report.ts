import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterReportUseCase } from '@use-cases/report/register-report';
import { registerReportSchema } from '@lib/zod';

export class RegisterReportController {
	async handle(request: Request, response: Response) {
		const { doctorId } = request;
		const file = request.file?.filename;
		const { patientId } = request.body;
		const { documentTitle } = request.body;
		
		const registerReport = container.resolve(RegisterReportUseCase);

		const validateBody = {
			documentTitle,
			document: file,
			patientId,
			doctorId
		};

		const registerReportRequest = registerReportSchema.parse(validateBody);
		
		await registerReport.execute(registerReportRequest);

		return response.status(201).send();
	}
}

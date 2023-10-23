import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterExamsUseCase } from 'use-cases/exams/register-exams';
import { registerExamSchema } from '@lib/zod';

export class RegisterExamController {
	async handle(request: Request, response: Response) {
		const registerExamUseCase = container.resolve(RegisterExamsUseCase);

		const { patientId } = request;
		const file = request.file?.filename;
		const { doctorId } = request.body;

		const validateBody = {
			document: file,
			doctorId,
			patientId
		};

		const registerExamRequest = registerExamSchema.parse(validateBody);
		
		await registerExamUseCase.execute(registerExamRequest);

		return response.status(201).send();
	}
}

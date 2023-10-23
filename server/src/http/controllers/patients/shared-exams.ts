import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SharedExamsUseCase } from 'use-cases/exams/shared-exams';
import { sharedExamsSchema } from '@lib/zod';

export class SharedExamsController {
	async handle(request: Request, response: Response) {
		const sharedExamsUseCase = container.resolve(SharedExamsUseCase);

		const { doctorId } = request.body;
		const { patientId } = request;
		const { examId } = request.params;

		const validateBody = {
			doctorId,
			patientId,
			examId
		};

		const sharedExamRequest = sharedExamsSchema.parse(validateBody);
		
		await sharedExamsUseCase.execute(sharedExamRequest);

		return response.status(204).send();
	}
}

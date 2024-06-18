import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { unsharedExamsSchema } from '@lib/zod';
import { UnharedExamsUseCase } from '@use-cases/exams/unshare-exams';

export class UnshareExamController {
	async handle(request: Request, response: Response): Promise<Response> {
		const unshareExamUseCase = container.resolve(UnharedExamsUseCase);

		const { doctorName } = request.body;
		const { patientId } = request;
		const { examId } = request.params;

		const validateBody = {
			doctorName,
			patientId,
			examId
		};

		const payload = unsharedExamsSchema.parse(validateBody);

		await unshareExamUseCase.execute(payload);
    
		return response.status(200).json({ message: 'Compartilhamento excluído com sucesso!' });
	}
}
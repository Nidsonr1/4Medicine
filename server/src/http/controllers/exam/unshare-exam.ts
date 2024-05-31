import { sharedExamsSchema } from '@lib/zod';
import { UnharedExamsUseCase } from '@use-cases/exams/unshare-exams';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UnshareExamController {
	async handle(request: Request, response: Response): Promise<Response> {
		const unshareExamUseCase = container.resolve(UnharedExamsUseCase);

		const { doctorId } = request.body;
		const { patientId } = request;
		const { examId } = request.params;

		const validateBody = {
			doctorId,
			patientId,
			examId
		};

		const payload = sharedExamsSchema.parse(validateBody);

		await unshareExamUseCase.execute(payload);
    
		return response.status(200).json({ message: 'Compartilhamento excluído com sucesso!' });
	}
}
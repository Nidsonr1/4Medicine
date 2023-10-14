import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterExamsUseCase } from 'use-cases/exams/register-exams';
import { z } from 'zod';

export class RegisterExamController {
	async handle(request: Request, response: Response) {
		const registerExam = container.resolve(RegisterExamsUseCase);

		const registerExamSchema = z.object({
			document: z.string(),
			doctorId: z.string()
		});

		const { patientId } = request;

		const exam = registerExamSchema.safeParse(request.body);

		if (exam.success === false) {
			return response.status(400).json({
				message: exam.error
			});
		}

		const newExam = {
			document: exam.data.document,
			doctorId: exam.data.doctorId,
			patientId
		};

		try {
			await registerExam.execute(newExam);

			return response.status(201).send();
		} catch (error) {
			if (error instanceof Error) {
				return response.status(500).json({
					message: error.message
				});
			}
		}
	}
}
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterExamsUseCase } from 'use-cases/exams/register-exams';
import { z } from 'zod';

export class RegisterExamController {
	async handle(request: Request, response: Response) {
		const registerExamUseCase = container.resolve(RegisterExamsUseCase);

		const examSchema = z.object({
			document: z.string(),
			doctorId: z.string(),
			patientId: z.string()
		});

		const { patientId } = request;
		const file = request.file?.filename;
		const { doctorId } = request.body;

		const validateBody = {
			document: file,
			doctorId,
			patientId
		};

		const exam = examSchema.safeParse(validateBody);

		if (exam.success === false) {
			return response.status(400).json({
				message: exam.error
			});
		}	
		
		try {
			await registerExamUseCase.execute(exam.data);

			return response.status(201).send();
		} catch (error) {
			if (error instanceof PatientNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}

			if (error instanceof Error) {
				return response.status(500).json({
					message: error
				});
			}
		}
	}
}

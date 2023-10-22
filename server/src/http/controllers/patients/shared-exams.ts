import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { SharedExamsUseCase } from 'use-cases/exams/shared-exams';

export class SharedExamsController {
	async handle(request: Request, response: Response) {
		const sharedExamsUseCase = container.resolve(SharedExamsUseCase);

		const sharedExamsSchema = z.object({
			doctorId: z.string(),
			patientId: z.string(),
			examId: z.string()
		});

		const { doctorId } = request.body;
		const { patientId } = request;
		const { examId } = request.params;

		const sharedExams = {
			doctorId,
			patientId,
			examId
		};

		const validateBody = sharedExamsSchema.safeParse(sharedExams);

		if (validateBody.success === false) {
			return response.json({
				message: validateBody.error.message
			});
		}
		console.log({
			doctorId,
			patientId,
			examId
		});
		try {
			await sharedExamsUseCase.execute(sharedExams);

			return response.status(204).send();
		} catch (error) {
			if (error instanceof DoctorNotFound || error instanceof PatientNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}
		}
	}
}

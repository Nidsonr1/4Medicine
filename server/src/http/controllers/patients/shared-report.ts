import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { SharedReportsUseCase } from 'use-cases/report/shared-reports';

export class SharedReportController {
	async handle(request: Request, response: Response) {
		const sharedReportUseCase = container.resolve(SharedReportsUseCase);

		const sharedReportsSchema = z.object({
			doctorId: z.string(),
			patientId: z.string(),
			reportId: z.string()
		});

		const { doctorId } = request.body;
		const { patientId } = request;
		const { reportId } = request.params;

		const sharedReport = {
			doctorId,
			patientId,
			reportId
		};

		const validateBody = sharedReportsSchema.safeParse(sharedReport);

		if (validateBody.success === false) {
			return response.json({
				message: validateBody.error.message
			});
		}

		try {
			await sharedReportUseCase.execute(sharedReport);

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

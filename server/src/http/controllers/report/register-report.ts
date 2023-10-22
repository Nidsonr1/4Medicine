import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterReportUseCase } from 'use-cases/report/register-report';
import { z } from 'zod';

export class RegisterReportController {
	async handle(request: Request, response: Response) {
		const registerReport = container.resolve(RegisterReportUseCase);

		const reportSchema = z.object({
			document: z.string(),
			patientId: z.string(),
			doctorId: z.string()
		});

		const { doctorId } = request;
		const file = request.file?.filename;
		const { patientId } = request.body;

		const validateBody = {
			document: file,
			patientId,
			doctorId
		};

		const report = reportSchema.safeParse(validateBody);

		if (report.success === false) {
			return response.status(400).json({
				message: report.error
			});
		}
		console.log(report.data);
		try {
			await registerReport.execute(report.data);

			return response.status(201).send();
		} catch (error) {
			if (error instanceof PatientNotFound || error instanceof DoctorNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}
		}
	}
}

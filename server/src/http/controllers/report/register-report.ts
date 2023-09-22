import { DoctorNotFound } from '@errors/doctor-error';
import { PatientNotFound } from '@errors/patient-errors';
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
		});

		const { doctorId } = request;

		const report = reportSchema.safeParse(request.body);

		if (report.success === false) {
			return response.status(400).json({
				message: report.error
			});
		}

		try {
			await registerReport.execute(report.data, doctorId);

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
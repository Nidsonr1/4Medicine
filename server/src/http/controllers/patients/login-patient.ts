import { InvalidCredentials } from '@helpers/api-errors/patient-errors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginPatient } from 'use-cases/patient/login-patient';
import { z } from 'zod';

export class LoginPatientController {
	async handle(request: Request, response: Response) {
		const loginPatientUseCase = container.resolve(LoginPatient);

		const loginSchema = z.object({
			email: z.string().email(),
			password: z.string()
		});

		const patient = loginSchema.safeParse(request.body);

		if (patient.success === false) {
			return response.status(400).json( patient.error.issues );
		}

		try {
			const result = await loginPatientUseCase.execute(patient.data);

			return response.json(result);
		} catch (error) {
			if (error instanceof InvalidCredentials) {
				return response.status(404).json({
					message: error.message
				});
			}
		} 
	}
}

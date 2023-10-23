import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { loginPatientSchema } from '@lib/zod';
import { LoginPatient } from 'use-cases/patient/login-patient';

export class LoginPatientController {
	async handle(request: Request, response: Response) {
		const loginPatientUseCase = container.resolve(LoginPatient);
		const loginPatientRequest = loginPatientSchema.parse(request.body);

		const result = await loginPatientUseCase.execute(loginPatientRequest);

		return response.json(result);
	}
}

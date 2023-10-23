import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LoginDoctor } from 'use-cases/doctor/login-doctor';
import { loginDoctorSchema } from '@lib/zod';

export class LoginDoctorController {
	async handle(request: Request, response: Response) {
		const loginDoctorUseCase = container.resolve(LoginDoctor);

		const loginDoctorRequest = loginDoctorSchema.parse(request.body);

		const result = await loginDoctorUseCase.execute(loginDoctorRequest);

		return response.json(result);
	}
}

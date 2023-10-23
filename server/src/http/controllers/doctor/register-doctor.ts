import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterDoctor } from 'use-cases/doctor/register-doctor';
import { registerDoctorSchema } from '@lib/zod';

export class RegisterDoctorController {
	async handle(request: Request, response: Response) {
		const registerDoctoruseCase = container.resolve(RegisterDoctor);

		const registerDoctorRequest = registerDoctorSchema.parse(request.body);

		await registerDoctoruseCase.execute(registerDoctorRequest);

		return response.status(201).json();
	}
}

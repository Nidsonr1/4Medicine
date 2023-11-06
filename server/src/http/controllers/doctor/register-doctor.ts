import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterDoctor } from 'use-cases/doctor/register-doctor';
import { registerDoctorSchema } from '@lib/zod';

export class RegisterDoctorController {
	async handle(request: Request, response: Response) {
		const registerDoctoruseCase = container.resolve(RegisterDoctor);

		const validateBody = {
			name: request.body.name,
			CRM: request.body.CRM,
			password: request.body.password,
			expertise: request.body.expertise,
			phone: request.body.phone,
			cell: request.body.cell,
			agreement: request.body.agreement
		};

		const registerDoctorRequest = registerDoctorSchema.parse(validateBody);

		await registerDoctoruseCase.execute(registerDoctorRequest);

		return response.status(201).json();
	}
}

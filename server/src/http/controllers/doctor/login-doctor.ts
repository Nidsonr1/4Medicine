import { InvalidCredentials } from '@errors/general-errors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginDoctor } from 'use-cases/doctor/login-doctor';
import { z } from 'zod';



export class LoginDoctorController {
	async handle(request: Request, response: Response) {
		const loginDoctorUseCase = container.resolve(LoginDoctor);
		const loginDoctorSchema = z.object({
			crm: z.string(),
			password: z.string().min(6)
		});

		const doctor = loginDoctorSchema.safeParse(request.body);

		if (doctor.success === false) {
			return response.status(400).json( doctor.error.issues );
		}

		try {
			const result = await loginDoctorUseCase.execute(doctor.data);

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
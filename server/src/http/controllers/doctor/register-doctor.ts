import { DoctorAlreadyExist } from '@errors/doctor-error';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterDoctor } from 'use-cases/doctor/register-doctor';
import { z } from 'zod';

export class RegisterDoctorController {
	async handle(request: Request, response: Response) {
		const registerDoctoruseCase = container.resolve(RegisterDoctor);

		const registerDoctorSchema = z.object({
			name: z.string(),
			CRM: z.string().min(10).max(11),
			password: z.string().min(6),
			expertise: z.array(z.string()),
			phone: z.string(),
			cell: z.string().optional(),
			agreement: z.array(z.string())
		});
		const doctor = registerDoctorSchema.safeParse(request.body);

		if(doctor.success === false) {
			return response.status(400).json( doctor.error.issues );
		}

		try {
			await registerDoctoruseCase.execute(doctor.data);

			return response.status(201).json();
		} catch (error) {
			if (error instanceof DoctorAlreadyExist) {
				return response.status(409).json({
					message: error.message
				});
			}
		}
	}
}
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateDoctor } from 'use-cases/doctor/update-doctor';
import { z } from 'zod';

export class UpdateDoctorController {
	async handle(request: Request, response: Response) {
		const updateDoctorUseCase = container.resolve(UpdateDoctor);

		const updateSchema = z.object({
			phone: z.string(),
			agreement: z.string(),
			cell: z.string().optional()
		});

		const { doctorId } = request;

		const doctor = updateSchema.safeParse(request.body);

		if (doctor.success === false) {
			return response.status(400).json(doctor.error.issues);
		}

		try {
			const result = await updateDoctorUseCase.execute(doctor.data, doctorId as string);
      
			return response.json(result);
		} catch (error) {
			if (error instanceof DoctorNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}
		}
	}
}

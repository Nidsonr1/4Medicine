import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateDoctor } from 'use-cases/doctor/update-doctor';
import { updateDoctorSchema } from '@lib/zod';

export class UpdateDoctorController {
	async handle(request: Request, response: Response) {
		const updateDoctorUseCase = container.resolve(UpdateDoctor);

		const { doctorId } = request;

		const validateBody = {
			phone: request.body.phone,
			agreement: request.body.agreement,
			cell: request.body.cell,
			doctorId
		};

		const updateDoctorRequest = updateDoctorSchema.parse(validateBody);

		const result = await updateDoctorUseCase.execute(updateDoctorRequest);
		
		return response.json(result);
	}
}

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { InfoDoctor } from 'use-cases/doctor/info-doctor';
import { infoDoctorSchema } from '@lib/zod';

export class InfoDoctorController {
	async handle(request: Request, response: Response) {
		const infoDoctorUseCase = container.resolve(InfoDoctor);

		const { doctorId } = infoDoctorSchema.parse(request.params);
    
		const result = await infoDoctorUseCase.execute(doctorId);

		return response.json(result);
	}
}

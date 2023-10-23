import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { InfoPatient } from 'use-cases/patient/info-patient';
import { infoPatientSchema } from '@lib/zod';

export class InfoPatientController {
	async handle(request: Request, response: Response) {
		const infoPatientUseCase = container.resolve(InfoPatient);
		
		const  { patientId }  = infoPatientSchema.parse(request);

		const result = await infoPatientUseCase.execute(patientId);

		return response.json(result);
	}
}

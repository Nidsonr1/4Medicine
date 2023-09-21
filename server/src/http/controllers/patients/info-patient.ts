import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { InfoPatient } from 'use-cases/patient/info-patient';
import { PatientNotFound } from '@errors/patient-errors';


export class InfoPatientController {
	async handle(request: Request, response: Response) {
		const infoPatientUseCase = container.resolve(InfoPatient);
		const  { patientId }  = request;
		
		try {
			const patient = await infoPatientUseCase.execute(patientId);

			return response.json({ patient });
		} catch (error) {
			if (error instanceof PatientNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}
		}
	}
}
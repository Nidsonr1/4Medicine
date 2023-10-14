import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterPatientUseCase } from '../../../use-cases/patient/register-patient';
import { container } from 'tsyringe';
import { PatientAlreadyExist } from '@errors/patient-errors';

export class RegisterPatientController {
	async handle (request: Request, response: Response) {
		const registerPatient = container.resolve(RegisterPatientUseCase);

		const registerSchemaBody = z.object({
			name: z.string(),
			cpf: z.string(),
			email: z.string(),
			password: z.string().min(8),
			gender: z.string(),
			cell: z.string(),
			dateOfBirth: z.string(),
			zipCode: z.string(),
			city: z.string(),
			uf: z.string(),
			neighborhood: z.string(),
			street: z.string(),
			complement: z.string(),
			number: z.number(),
		});
    
		const patient  = registerSchemaBody.safeParse(request.body);

		if (patient.success === false) {
			return response.status(400).json( patient.error.issues );
		}
		
		try {
			await registerPatient.execute(patient.data);
      
			return response.status(201).json();
		} catch (error) {
			if (error instanceof PatientAlreadyExist) {
				return response.status(409).json({
					message: error.message
				});
			}
		}
	}
}
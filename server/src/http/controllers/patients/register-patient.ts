import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterPatientUseCase } from '../../../use-cases/patient/register-patient';
import { container } from 'tsyringe';
import { Unauthenticated } from '@helpers/api-errors/api-errors';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';

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
			complement: z.string().optional(),
			number: z.number(),
		});
    
		const patient  = registerSchemaBody.parse(request.body);

		throw new PatientNotFound();
		
		// await registerPatient.execute(patient);
      
		// return response.status(201).json();
	}
}

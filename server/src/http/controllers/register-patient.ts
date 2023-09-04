import { Request, Response } from 'express';
import { z } from 'zod';
import { RegisterPatientUseCase } from '../../use-cases/patient/register-patient';
import { container } from 'tsyringe';

export class RegisterPatientController {
	async handle (request: Request, response: Response) {
		const registerPatient = container.resolve(RegisterPatientUseCase);

		const registerSchemaBody = z.object({
			name: z.string(),
			cpf: z.string(),
			email: z.string(),
			password: z.string(),
			color: z.string(),
			birthdate: z.string(),
			motherName: z.string(),
			fatherName: z.string(),
			bloodType: z.string(),
			zipCode: z.string(),
			city: z.string(),
			uf: z.string(),
			neighborhood: z.string(),
			street: z.string(),
			complement: z.string(),
			number: z.coerce.number(),
			cell: z.string(),
		});
    
		const patient = registerSchemaBody.parse(request.body);
  
		try {
			await registerPatient.execute(patient);
      
			return response.status(201).send();
		} catch (error) {
			if (error instanceof Error) {
				return response.status(409).send();
			}
		}
  
	}
}
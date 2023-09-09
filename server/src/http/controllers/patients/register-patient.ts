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
			password: z.string().min(6),
			color: z.string(),
			birthdate: z.string(),
			civilStatus: z.string(),
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
    
		const patient  = registerSchemaBody.safeParse(request.body);

		if (patient.success === false) {
			return response.status(400).json( patient.error.issues );
		}
		
		try {
			await registerPatient.execute(patient.data);
      
			return response.status(201).send();
		} catch (error) {
			if (error instanceof PatientAlreadyExist) {
				return response.status(409).send({
					message: error.message
				});
			}
		}
	}
}
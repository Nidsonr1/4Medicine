import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterPatientUseCase } from 'use-cases/patient/register-patient';
import { registerPatientSchema } from 'lib/zod';

export class RegisterPatientController {
	async handle (request: Request, response: Response) {
		const registerPatient = container.resolve(RegisterPatientUseCase);
    
		const registerPatientRequest  = registerPatientSchema.parse(request.body);
		
		await registerPatient.execute(registerPatientRequest);
      
		return response.status(201).json({
			message: 'Cadastro realizado com sucesso!'
		});
	}
}

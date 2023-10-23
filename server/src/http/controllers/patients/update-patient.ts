import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { updatePatientSchema } from '@lib/zod';
import { UpdatePatient } from 'use-cases/patient/update-patient';

export class UpdatePatientController {
	async handle(request: Request, response: Response) {
		const updatePatient = container.resolve(UpdatePatient);
		const { patientId } = request;

		const validateBody = {
			name: request.body.name,
			email: request.body.email,
			zipCode: request.body.zipCode,
			city: request.body.city,
			uf: request.body.uf,
			neighborhood: request.body.neighborhood,
			street: request.body.street,
			complement: request.body.complement,
			number: request.body.number,
			cell: request.body.cell,
			patientId
		};

		const updatePatientRequest = updatePatientSchema.parse(validateBody);

		const result = await updatePatient.execute(updatePatientRequest);

		return response.status(202).json(result);
	}
}

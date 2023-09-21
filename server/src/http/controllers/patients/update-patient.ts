import { PatientNotFound } from '@errors/patient-errors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePatient } from 'use-cases/patient/update-patient';
import { z } from 'zod';



export class UpdatePatientController {
	async handle(request: Request, response: Response) {
		const updatePatient = container.resolve(UpdatePatient);
		const { patientId } = request;

		const updateSchemaBody = z.object({
			name: z.string(),
			email: z.string(),
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

		const patient = updateSchemaBody.safeParse(request.body);

		if (patient.success === false) {
			return response.status(400).json( patient.error.issues );
		}

		try {
			const result = await updatePatient.execute(patient.data, patientId);

			return response.status(202).json(result);
		} catch (error) {
			if (error instanceof PatientNotFound) {
				return response.status(404).json(error.message);
			}
		}
	}
}
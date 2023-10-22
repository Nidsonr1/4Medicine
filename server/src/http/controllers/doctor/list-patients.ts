import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPatientsUseCase } from 'use-cases/patient/list-patients';



export class ListPatientsController {
	async handle(request: Request, response: Response) {
		const listPatients = container.resolve(ListPatientsUseCase);

		const { search } = request.query;
		const { doctorId } = request;

		const result = await listPatients.execute(doctorId, search as string);

		return response.json({ result });
	}
}

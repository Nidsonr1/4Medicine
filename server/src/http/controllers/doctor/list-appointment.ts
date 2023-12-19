import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAppointmentUseCase } from 'use-cases/appointment/list-appointment';
import { listAppointmentSchema } from '@lib/zod';

export class ListAppointmentsDoctorController {
	async handle(request: Request, response: Response) {
		const listAppointment = container.resolve(ListAppointmentUseCase);

		const { doctorId } = request;
		const { date } = request.query;

		const validateBody = {
			date,
			customerId: doctorId
		};

		const listAppointmentRequest = listAppointmentSchema.parse(validateBody);

		const result = await listAppointment.execute(listAppointmentRequest);

		return response.json(result);
	}
}
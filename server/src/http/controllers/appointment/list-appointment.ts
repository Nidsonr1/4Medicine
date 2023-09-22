import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAppointmentUseCase } from 'use-cases/appointment/list-appointment';

export class ListAppointmentController {
	async handle(request: Request, response: Response) {
		const listAppointment = container.resolve(ListAppointmentUseCase);

		const { patientId, doctorId } = request;

		try {
			const result = await listAppointment.execute(patientId, doctorId);

			return response.json({
				result
			});
		} catch (error) {
			if ( error instanceof Error ) {
				return response.status(500).json({
					message: error.message
				});
			}
		}
	}
}
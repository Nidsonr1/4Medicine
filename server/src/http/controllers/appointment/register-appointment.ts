import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterAppointmentUseCase } from 'use-cases/appointment/register-appointment';
import { registerAppointmentSchema } from '@lib/zod';

export class RegisterAppointmentController {
	async handle(request: Request, response: Response) {
		const registerAppointment = container.resolve(RegisterAppointmentUseCase);

		const { doctorId } = request;

		const validateBody = {
			title: request.body.title,
			startDate: request.body.startDate,
			endDate: request.body.endDate,
			description: request.body.description,
			link: request.body.link,
			patientId: request.body.patientId,
			doctorId
		};

		const registerAppointmentRequest = registerAppointmentSchema.parse(validateBody);

		await registerAppointment.execute(registerAppointmentRequest);

		return response.status(201).json({
			message: 'Horário marcado com sucesso!'
		});
	}
}

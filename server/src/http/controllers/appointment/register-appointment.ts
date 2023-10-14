import { AppointmentAlreadyExist } from '@errors/appointment-error';
import { DoctorNotFound } from '@errors/doctor-error';
import { PatientNotFound } from '@errors/patient-errors';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RegisterAppointmentUseCase } from 'use-cases/appointment/register-appointment';
import { z } from 'zod';

export class RegisterAppointmentController {
	async handle(request: Request, response: Response) {
		const registerAppointment = container.resolve(RegisterAppointmentUseCase);

		const { patientId } = request;

		const registerAppointmentSchema = z.object({
			title: z.string(),
			startDate: z.string(),
			endDate: z.string(),
			description: z.string().optional(),
			doctorId: z.string(),
		});

		const appointment = registerAppointmentSchema.safeParse(request.body);

		if (appointment.success === false) {
			return response.status(400).json( appointment.error );
		}

		const newAppointment = {
			title: appointment.data.title,
			startDate: appointment.data.startDate,
			endDate: appointment.data.endDate,
			description: appointment.data.description,
			doctorId: appointment.data.doctorId,
			patientId
		};
		
		try {
			const result = await registerAppointment.execute(newAppointment);

			return response.json(result);
		} catch (error) {
			if (error instanceof PatientNotFound || error instanceof DoctorNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}

			if (error instanceof AppointmentAlreadyExist) {
				return response.status(409).json({
					message: error.message
				});
			}
		}
	}
}
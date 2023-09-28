import { DoctorNotFound } from '@errors/doctor-error';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InfoDoctor } from 'use-cases/doctor/info-doctor';



export class InfoDoctorController {
	async handle(request: Request, response: Response) {
		const infoDoctorUseCase = container.resolve(InfoDoctor);

		const { doctorId } = request.params;
    
		try {
			const result = await infoDoctorUseCase.execute(doctorId);

			return response.json(result);
		} catch (error) {
			if (error instanceof DoctorNotFound) {
				return response.status(404).json({
					message: error.message
				});
			}
		}
	}
}
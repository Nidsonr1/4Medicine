import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListSharedDoctors } from 'use-cases/doctor/listSharedDoctors';
import { z } from 'zod';



export class ListDoctorsSharedTo {
	async handle(request: Request, response: Response) {
		const doctorsIds = request.body;
		const listDoctorsUseCase = container.resolve(ListSharedDoctors);

		const listDoctorsSchema = z.object({
			doctorsIds: z.array(z.string())
		});

		const doctors = listDoctorsSchema.safeParse(doctorsIds);

		if (doctors.success === false) {
			return response.status(400).json(
				doctors.error
			);
		}
		
		try {
			const result = await listDoctorsUseCase.execute(doctors.data.doctorsIds);
			return response.json(result);
		} catch (error) {
			return response.status(500).json('erro');
		}
	}
}
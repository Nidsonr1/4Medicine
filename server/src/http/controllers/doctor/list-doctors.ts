import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDoctors } from 'use-cases/doctor/list-doctors';
import { listDoctorSchema } from '@lib/zod';

export class ListDoctorsController {
	async handle(request: Request, response: Response) {
		const listDoctorsUseCase = container.resolve(ListDoctors);

		const { search } = listDoctorSchema.parse(request.query);
		
		const result = await listDoctorsUseCase.execute(search);
						
		return response.json(result);
		
	}
}
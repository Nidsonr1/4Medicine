import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSharedDoctors } from 'use-cases/doctor/listSharedDoctors';
import { listDoctorsWhoSharedSchema } from '@lib/zod';

export class ListDoctorsSharedTo {
	async handle(request: Request, response: Response) {
		const listDoctorsWhoShared = container.resolve(ListSharedDoctors);

		const { doctorsIds } = listDoctorsWhoSharedSchema.parse(request.body);

		const result = await listDoctorsWhoShared.execute(doctorsIds);

		return response.json(result);
	}
}
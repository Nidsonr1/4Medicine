import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListDoctors } from 'use-cases/doctor/list-doctors';



export class ListDoctorsController {
	async handle(request: Request, response: Response) {
		const listDoctorsUseCase = container.resolve(ListDoctors);

		const { search } = request.query;


		try {
			const result = await listDoctorsUseCase.execute(search as string);

			
			return response.status(200).json(result);
		} catch (error) {
			return response.status(500).json('Deu Erro!');
		}
	}
}
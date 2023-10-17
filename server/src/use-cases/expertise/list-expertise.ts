import { inject, injectable } from 'tsyringe';
import { ExpertiseRepository } from '@repositories/expertise-repository';


@injectable()
export class ListExpertiseUseCase {
	constructor(
    @inject('ExpertiseRepository')
    private expertiseRepository: ExpertiseRepository
	) {}

	async execute() {
		const expertises = await this.expertiseRepository.list();

		return expertises;
	}
}
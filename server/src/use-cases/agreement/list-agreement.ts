import { AgreementRepository } from '@repositories/agreement-repository';
import { inject, injectable } from 'tsyringe';



@injectable()
export class ListAgreementUseCase {
	constructor(
    @inject('AgreementRepository')
    private agreementRepository: AgreementRepository   
	) {}

	async execute() { 
		const agreements = await this.agreementRepository.list();
		return agreements;
	}
}

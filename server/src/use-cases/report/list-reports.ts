import { inject, injectable } from 'tsyringe';

import { IListReportsRequest } from '@DTO/report';
import { ReportRepository } from '@repositories/report-repository';

@injectable()
export class ListReportsUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository
	) {}

	async execute(data: IListReportsRequest) {
		const reports  = await this.reportRepository.listToPatient(data);

		return reports;
	}
}
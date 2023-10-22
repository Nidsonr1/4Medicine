import { ReportRepository } from '@repositories/report-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class ListReportsUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository
	) {}

	async execute(customerId: string, order: string, search?: string) {
		const reports  = await this.reportRepository.listToPatient({
			customerId,
			order,
			search
		});

		return reports;
	}
}
import { inject, injectable } from 'tsyringe';

import { IListReportsRequest } from '@DTO/report';
import { ReportRepository } from '@repositories/report-repository';
import { listToPatient } from '@helpers/list-report-to-domain';

@injectable()
export class ListReportsToPatientUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository
	) {}

	async execute(data: IListReportsRequest) {
		const reports  = await this.reportRepository.listToPatient(data);

		if (!reports) return null;

		const promise = reports.map((report) => {
			return listToPatient(report);
		});

		return (await Promise.all(promise)).map((reportsPatient) => {
			return reportsPatient;
		});
	}
}
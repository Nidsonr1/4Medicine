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
		const reportsInfo  = await this.reportRepository.listToPatient(data);
		
		if (!reportsInfo) return null;

		const {
			totalPage,
			total
		} = reportsInfo;


		const promise = reportsInfo.reports.map((report) => {
			return listToPatient(report);
		});

		const reportsToPatient = (await Promise.all(promise)).map((reportsPatient) => {
			return reportsPatient;
		});

		return {
			total,
			totalPage,
			reportsToPatient
		};
	}
}
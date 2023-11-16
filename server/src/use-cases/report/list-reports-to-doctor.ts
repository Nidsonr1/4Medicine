import { inject, injectable } from 'tsyringe';

import { IListReportsRequest } from '@DTO/report';
import { ReportRepository } from '@repositories/report-repository';
import { listToDoctor } from '@helpers/list-report-to-domain';
import { DoctorRepository } from '@repositories/doctor-repository';
import { DoctorNotFound } from '@errors/doctor-error';

@injectable()
export class ListReportsToDoctorUseCase {
	constructor(
    @inject('ReportRepository')
    private reportRepository: ReportRepository,

		@inject('DoctorRepository')
		private doctorRepository: DoctorRepository
	) {}

	async execute(data: IListReportsRequest) {
		const doctorExist = await this.doctorRepository.findById(data.customerId);

		if (!doctorExist) throw new DoctorNotFound();

		const reports  = await this.reportRepository.listToDoctor(data, doctorExist.name);
		
		if (!reports) return null;

		const promise = reports.map((report) => {
			return listToDoctor(report);
		});

		return (await Promise.all(promise)).map((reportsDoctor) => {
			return reportsDoctor;
		});
	}
}
import { DoctorRepository } from '@repositories/doctor-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListDoctors {
	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute(search: string) {
		const doctors = await this.doctorRepository.listByAgreement(search);

		const result = doctors.map((doctor) => {
			return {
				id: doctor.id,
				name: doctor.name,
				CRM: doctor.CRM,
				expertise: doctor.expertise,
				phone: doctor.phone,
				agreement: doctor.agreement
			};
		});

		return result;

	}
}
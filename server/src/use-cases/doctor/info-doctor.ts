import { IReturnDoctorsInfo } from '@DTO/doctor';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class InfoDoctor {

	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute(id: string): Promise<IReturnDoctorsInfo> {
		const doctor = await this.doctorRepository.findById(id);

		if (!doctor) {
			throw new DoctorNotFound();
		}

		return {
			id: doctor.id,
			name: doctor.name,
			CRM: doctor.CRM,
			expertise: doctor.expertise,
			phone: doctor.phone,
			agreement: doctor.agreement,
			cell: doctor.cell
		};
	}
}

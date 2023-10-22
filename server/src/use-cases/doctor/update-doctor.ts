import { inject, injectable } from 'tsyringe';

import { IUpdateDoctorRequest, IreturnDoctorsInfo } from '@DTO/doctor';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';

@injectable()
export class UpdateDoctor {

	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute(data: IUpdateDoctorRequest, id: string): Promise<IreturnDoctorsInfo> {
		const doctorExist = await this.doctorRepository.findById(id);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		const doctor = await this.doctorRepository.update(data, id);

		return {
			id: doctor.id,
			name: doctor.name,
			CRM: doctor.CRM,
			expertise: doctor.expertise,
			agreement: doctor.agreement,
			phone: doctor.phone,
			cell: doctor.cell
		};
	}
}

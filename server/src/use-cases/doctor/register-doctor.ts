import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { RegisterDoctorRequest } from '@DTO/doctor';
import { DoctorAlreadyExist } from '@errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';

@injectable()
export class RegisterDoctor {
	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository,
	) {}

	async execute(data: RegisterDoctorRequest) {
		const doctorAlreadyExist = await this.doctorRepository.findByCRM(data.CRM);

		if (doctorAlreadyExist) {
			throw new DoctorAlreadyExist();
		}

		const passwordHash = await hash(data.password, 10);

		await this.doctorRepository.create({
			name: data.name,
			CRM: data.CRM,
			password: passwordHash,
			expertise: data.expertise,
			phone: data.phone,
			agreement: data.agreement,
			cell: data.cell
		});
	}
}
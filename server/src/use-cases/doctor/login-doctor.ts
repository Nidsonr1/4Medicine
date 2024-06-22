import { inject, injectable } from 'tsyringe';
import { env } from 'env';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ILoginDoctorRequest, ILoginDoctorResponse } from '@DTO/doctor';
import { InvalidCredentials } from '@helpers/api-errors/api-errors';
import { DoctorRepository } from '@repositories/doctor-repository';

@injectable()
export class LoginDoctor {

	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute({CRM, password}: ILoginDoctorRequest): Promise<ILoginDoctorResponse> {
		const doctor = await this.doctorRepository.findByCRM(CRM);

		if (!doctor) {
			throw new InvalidCredentials();
		}

		const passwordCompare = await compare(password, doctor.password);

		if (!passwordCompare) {
			throw new InvalidCredentials();
		}

		const token = sign({ CRM }, '345066e416e13e7d2dc19de4632cb996', {
			subject: doctor.id,
			expiresIn: '1d'
		});

		return {
			id: doctor.id,
			name: doctor.name,
			CRM,
			token
		};
	}
}

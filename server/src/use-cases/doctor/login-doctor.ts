import { InvalidCredentials } from '@errors/general-errors';
import { DoctorRepository } from '@repositories/doctor-repository';
import { compare } from 'bcrypt';
import { env } from 'env';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface LoginDoctorRequest {
  crm: string;
  password: string
}

@injectable()
export class LoginDoctor {

	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute({crm, password}: LoginDoctorRequest) {
		const doctor = await this.doctorRepository.findByCRM(crm);

		if (!doctor) {
			throw new InvalidCredentials();
		}

		const passwordCompare = await compare(password, doctor.password);

		if (!passwordCompare) {
			throw new InvalidCredentials();
		}

		const token = sign({ crm }, env.PATIENTKEY, {
			subject: doctor.id,
			expiresIn: '1d'
		});

		return {
			name: doctor.name,
			crm,
			token
		};
	}
}
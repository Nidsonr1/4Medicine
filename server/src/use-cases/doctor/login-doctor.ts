import { ILoginDoctorRequest, ILoginDoctorResponse } from '@DTO/doctor';
import { InvalidCredentials } from '@errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';
import { compare } from 'bcrypt';
import { env } from 'env';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';



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

		const token = sign({ CRM }, env.PATIENTKEY, {
			subject: doctor.id,
			expiresIn: '1d'
		});

		return {
			name: doctor.name,
			CRM,
			token
		};
	}
}
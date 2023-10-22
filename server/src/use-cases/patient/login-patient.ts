import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';

import { InvalidCredentials } from '@helpers/api-errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { sign } from 'jsonwebtoken';
import { env } from 'env';
import { ILoginPatientRequest } from '@DTO/patient';

@injectable()
export class LoginPatient {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute({ email, password }: ILoginPatientRequest)  {
		const patient = await this.patientRepository.findByEmail(email);

		if (!patient) {
			throw new InvalidCredentials();
		}

		const passwordCompare = await compare(password, patient.password);

		
		if (!passwordCompare) {
			throw new InvalidCredentials();
		}

		const token = sign({ email }, env.PATIENTKEY, {
			subject: patient.id,
			expiresIn: '1d'
		});

		return {
			name: patient.name,
			email,
			token
		};
	}
}

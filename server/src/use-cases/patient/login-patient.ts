import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';

import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { sign } from 'jsonwebtoken';
import { env } from 'env';
import { LoginPatientRequest } from '@DTO/patient';

@injectable()
export class LoginPatient {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute({ email, password }: LoginPatientRequest)  {
		const patient = await this.patientRepository.findByEmail(email);

		if (!patient) {
			throw new PatientNotFound();
		}

		const passwordCompare = await compare(password, patient.password);

		// To-Do: Alter "Patient not Found" to "Credential Invalid"
		if (!passwordCompare) {
			throw new PatientNotFound();
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
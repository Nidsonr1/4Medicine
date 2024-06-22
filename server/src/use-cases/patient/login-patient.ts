import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';

import { InvalidCredentials } from '@helpers/api-errors/api-errors';
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

	async execute({ cpf, password }: ILoginPatientRequest)  {
		const patient = await this.patientRepository.findByCpf(cpf);

		if (!patient) {
			throw new InvalidCredentials();
		}

		const passwordCompare = await compare(password, patient.password);
		
		if (!passwordCompare) {
			throw new InvalidCredentials();
		}

		const token = sign({ cpf }, '345066e416e13e7d2dc19de4632cb996', {
			subject: patient.id,
			expiresIn: '1d'
		});

		return {
			id: patient.id,
			name: patient.name,
			token
		};
	}
}

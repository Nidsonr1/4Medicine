import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { PatientRepository } from '../../repositories/patient-repository';
import { RegisterPatientRequest } from '@DTO/patient';
import { PatientAlreadyExist } from '@errors/patient-errors';

@injectable()
export class RegisterPatientUseCase {
  
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: RegisterPatientRequest) {
		const patientWithCpf = await this.patientRepository.findByCpf(data.cpf);

		if (patientWithCpf) {
			throw new PatientAlreadyExist();
		}

		const passwordHash = await hash(data.password, 10);

		await this.patientRepository.create({
			name: data.name,
			cpf: data.cpf,
			email: data.email,
			password: passwordHash,
			gender: data.gender,
			cell: data.cell,
			dateOfBirth: data.dateOfBirth,
			zipCode: data.zipCode,
			neighborhood: data.neighborhood,
			street: data.street,
			complement: data.complement,
			number: data.number,
			uf: data.uf,
			city: data.city,
		});
	}
}
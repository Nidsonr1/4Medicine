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
			color: data.color,
			birthdate: data.birthdate,
			motherName: data.motherName,
			fatherName: data.fatherName,
			bloodType: data.bloodType,
			zipCode: data.zipCode,
			city: data.city,
			uf: data.uf,
			neighborhood: data.neighborhood,
			street: data.street,
			complement: data.complement,
			number: data.number,
			cell: data.cell,
		});
	}
}
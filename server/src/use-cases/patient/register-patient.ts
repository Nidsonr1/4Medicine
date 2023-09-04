import { inject, injectable } from 'tsyringe';
import { PatientRepository } from '../../repositories/patient-repository';
import { RegisterPatientRequest } from '@DTO/patient';

@injectable()
export class RegisterPatientUseCase {
  
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: RegisterPatientRequest) {
		const patientWithCpf = await this.patientRepository.findByCpf(data.cpf);

		if (patientWithCpf) {
			throw new Error('cpf already exist');
		}

		await this.patientRepository.create(data);
	}
}
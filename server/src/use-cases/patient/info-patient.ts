import { IReturnPatient } from '@DTO/patient';
import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class InfoPatient {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}
  
	async execute(id: string): Promise<IReturnPatient> {
		const patient = await this.patientRepository.findById(id);

		if (!patient) {
			throw new PatientNotFound();
		}

		return {
			id: patient.id,
			name: patient.name,
			cpf: patient.cpf,
			email: patient.email,
			dateOfBirth: patient.dateOfBirth,
			address: {
				zipCode: patient.zipCode,
				city: patient.city,
				uf: patient.uf,
				neighborhood: patient.neighborhood,
				street: patient.street,
				complement: patient.complement,
				number: patient.number,
				cell: patient.cell,
			}
		};
	}
}
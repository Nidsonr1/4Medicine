import { ReturnPatient, UpdatePatientRequest } from '@DTO/patient';
import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { hideSensitiveData } from 'lib/hideSensitiveData';
import { inject, injectable } from 'tsyringe';


@injectable()
export class UpdatePatient {

	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: UpdatePatientRequest, patientId: string): Promise<ReturnPatient> {
		const patientExist = await this.patientRepository.findById(patientId);

		if (!patientExist) {
			throw new PatientNotFound();
		}

		const patientEdited = await this.patientRepository.update(data, patientId);

		const sensitiveData = hideSensitiveData(patientEdited.email, patientEdited.cpf);

		return {
			id: patientEdited.id,
			name: patientEdited.name,
			cpf: sensitiveData.cpf,
			email: sensitiveData.email,
			dateOfBirth: patientEdited.dateOfBirth,
			address: {
				zipCode: patientEdited.zipCode,
				city: patientEdited.city,
				uf: patientEdited.uf,
				neighborhood: patientEdited.neighborhood,
				street: patientEdited.street,
				complement: patientEdited.complement,
				number: patientEdited.number,
				cell: patientEdited.cell,
			}
		};
	}
}
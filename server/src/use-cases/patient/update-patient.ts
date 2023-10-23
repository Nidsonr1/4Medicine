import { IReturnPatient, IUpdatePatientRequest } from '@DTO/patient';
import { PatientNotFound } from '@helpers/api-errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { hideSensitiveData } from 'helpers/hideSensitiveData';
import { inject, injectable } from 'tsyringe';


@injectable()
export class UpdatePatient {

	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}

	async execute(data: IUpdatePatientRequest): Promise<IReturnPatient> {
		const patientExist = await this.patientRepository.findById(data.patientId);

		if (!patientExist) {
			throw new PatientNotFound();
		}

		const patientEdited = await this.patientRepository.update(data, data.patientId);

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

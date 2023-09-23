import { ReturnPatient, UpdatePatientRequest } from '@DTO/patient';
import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
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

		return {
			id: patientEdited.id,
			name: patientEdited.name,
			cpf: patientEdited.cpf,
			email: patientEdited.email,
			civilStatus: patientEdited.civilStatus,
			color: patientEdited.color,
			birthdate: patientEdited.birthdate,
			motherName: patientEdited.motherName,
			fatherName: patientEdited.fatherName,
			bloodType: patientEdited.bloodType,
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
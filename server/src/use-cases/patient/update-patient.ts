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

		const result = await this.patientRepository.update(data, patientId);

		return {
			name: result.name,
			cpf: result.cpf,
			email: result.email,
			civilStatus: result.civilStatus,
			color: result.color,
			birthdate: result.birthdate,
			motherName: result.motherName,
			fatherName: result.fatherName,
			bloodType: result.bloodType,
			address: {
				zipCode: result.zipCode,
				city: result.city,
				uf: result.uf,
				neighborhood: result.neighborhood,
				street: result.street,
				complement: result.complement,
				number: result.number,
				cell: result.cell,
			}
		};
	}
}
import { ReturnPatient } from '@DTO/patient';
import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class InfoPatient {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}
  
	async execute(id: string): Promise<ReturnPatient> {
		const patient = await this.patientRepository.findById(id);

		if (!patient) {
			throw new PatientNotFound();
		}

		return {
			id: patient.id,
			name: patient.name,
			cpf: patient.cpf,
			email: patient.email,
			civilStatus: patient.civilStatus,
			color: patient.color,
			birthdate: patient.birthdate,
			motherName: patient.motherName,
			fatherName: patient.fatherName,
			bloodType: patient.bloodType,
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
import { UpdatePatientRequest } from '@DTO/patient';
import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class UpdatePatient {

	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}
	async execute(data: UpdatePatientRequest, patientId: string) {
		const patientExist = await this.patientRepository.findById(patientId);

		if (!patientExist) {
			throw new PatientNotFound();
		}

		const result = await this.patientRepository.update(data, patientId);

		return result;
	}
}
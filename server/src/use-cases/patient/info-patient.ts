import { PatientNotFound } from '@errors/patient-errors';
import { PatientRepository } from '@repositories/patient-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class InfoPatient {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository
	) {}
  
	async execute(id: string) {
		const patient = await this.patientRepository.findById(id);

		if (!patient) {
			throw new PatientNotFound();
		}

		return patient;
	}
}
import { inject, injectable } from 'tsyringe';

import { IListPatientsResponse } from '@DTO/doctor';
import { DoctorNotFound } from '@helpers/api-errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { hideSensitiveData } from 'helpers/hideSensitiveData';

@injectable()
export class ListPatientsUseCase {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository,

	@inject('DoctorRepository')
	private doctorRepository: DoctorRepository
	) {}

	async execute(data: IListPatientsResponse) {
		const doctorExist = await this.doctorRepository.findById(data.doctorId);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		const patients = await this.patientRepository.list(data.search);

		const result = patients?.map((patient) => {

			const sensitiveData = hideSensitiveData(patient.email, patient.cpf);
			
			return {
				id: patient.id,
				name: patient.name,
				cpf: sensitiveData.cpf
			};
		});

		return result;
	}
}

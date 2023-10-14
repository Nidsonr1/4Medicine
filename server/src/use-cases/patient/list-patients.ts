import { ReturnPatient } from '@DTO/patient';
import { DoctorNotFound } from '@errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';
import { PatientRepository } from '@repositories/patient-repository';
import { hideSensitiveData } from 'lib/hideSensitiveData';
import { inject, injectable } from 'tsyringe';


export interface ListPatientsResponse {

}

@injectable()
export class ListPatientsUseCase {
	constructor(
    @inject('PatientRepository')
    private patientRepository: PatientRepository,

		@inject('DoctorRepository')
		private doctorRepository: DoctorRepository
	) {}

	async execute(doctorId: string, search?: string) {
		const doctorExist = await this.doctorRepository.findById(doctorId);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		const patients = await this.patientRepository.list(search);

		

		const result = patients?.map((patient) => {

			const sensitiveData = hideSensitiveData(patient.email, patient.cpf);
			
			return {
				id: patient.id,
				name: patient.name,
				cpf: sensitiveData.cpf,
				email: sensitiveData.email,
				gender: patient.gender,				
				cell: patient.cell,
				dateOfBirth: patient.dateOfBirth,
				address: {
					zipCode: patient.zipCode,
					city: patient.city,
					uf: patient.uf,
					neighborhood: patient.neighborhood,
					street: patient.street,
					complement: patient.complement,
					number: patient.number,
				}
			};
		});

		return result;
	}
}
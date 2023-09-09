import { DoctorNotFound } from '@errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class InfoDoctor {

	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute(id: string) {
		const doctor = await this.doctorRepository.findById(id);

		if (!doctor) {
			throw new DoctorNotFound();
		}

		return doctor;
	}
}
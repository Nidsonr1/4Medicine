import { UpdateDoctorRequest } from '@DTO/doctor';
import { DoctorNotFound } from '@errors/doctor-error';
import { DoctorRepository } from '@repositories/doctor-repository';
import { inject, injectable } from 'tsyringe';


@injectable()
export class UpdateDoctor {

	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute(data: UpdateDoctorRequest, id: string) {
		const doctorExist = await this.doctorRepository.findById(id);

		if (!doctorExist) {
			throw new DoctorNotFound();
		}

		const doctor = await this.doctorRepository.update(data, id);

		return doctor;
	}
}
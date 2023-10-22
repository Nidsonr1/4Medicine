import { DoctorRepository } from '@repositories/doctor-repository';
import { inject, injectable } from 'tsyringe';



@injectable()
export class ListSharedDoctors {
	constructor(
    @inject('DoctorRepository')
    private doctorRepository: DoctorRepository
	) {}

	async execute(doctorsId: string[]) {
		const promise =  doctorsId.map(async (doctorId) => {
			return await this.doctorRepository.findById(doctorId);
		});
		const doctors = (await Promise.all(promise)).map((doctor) => {
			return {
				id: doctor?.id,
				name: doctor?.name,
			};
		});

		return doctors;
	}
}
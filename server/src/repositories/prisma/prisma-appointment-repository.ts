import { IFindByDateRequest, IPrismaCreateAppointment } from '@DTO/appointment';
import { prisma } from '@lib/prisma';
import { Appointment } from '@prisma/client';
import { AppointmentRepository } from '@repositories/appointment-repository';

export class PrismaAppointmentRepository implements AppointmentRepository {
	async listByCustomer(customerId: string): Promise<Appointment[] | null> {
		const appointments = await prisma.appointment.findMany({
			where: {
				OR: [
					{ doctor_id: customerId },
					{ patient_id: customerId }
				]
			}
		});
		
		return appointments;
	}
	async create(data: IPrismaCreateAppointment): Promise<void> {
		await prisma.appointment.create({
			data: {
				title: data.title,
				description: data.description,
				start_date: data.startDate,
				end_date: data.endDate,
				link: data.link,
				doctor_id: data.doctor_id,
				patient_id: data.patient_id
			}
		});
	}
	async findByDate(data: IFindByDateRequest): Promise<Appointment | null> {
		const {
			startDate,
			endDate,
			doctorId,
			patientId
		} = data;

		const appointments = await prisma.appointment.findFirst({
			where: {
				OR: [
					{
						AND: [
							{ start_date: { lte: startDate } },
							{ end_date: { gte: startDate } },
							{ doctor_id: doctorId },
							{ patient_id: patientId },
						]
					},
					{
						AND: [
							{ start_date: { lte: endDate } },
							{ end_date: { gte: endDate } },
							{ doctor_id: doctorId },
							{ patient_id: patientId },
						]
					}
				]
			}
		});
		
		return appointments;
	}
  
}
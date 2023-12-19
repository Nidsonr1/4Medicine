import { IFindByDateRequest, IListByCustomer, IPrismaCreateAppointment } from '@DTO/appointment';
import { prisma } from '@lib/prisma';
import { Appointment } from '@prisma/client';
import { AppointmentRepository } from '@repositories/appointment-repository';

export class PrismaAppointmentRepository implements AppointmentRepository {
	async listByCustomer(data: IListByCustomer): Promise<Appointment[] | null> {
		const appointments = await prisma.appointment.findMany({
			where: {
				OR: [
					{
						AND: [
							{ start_date: { gte: data.startDate } },
							{ start_date: { lt: data.endDate } },
							{ patient_id: data.customerId },
						],
					},
					{
						AND: [
							{ start_date: { gte: data.startDate } },
							{ start_date: { lt: data.endDate } },
							{ doctor_id: data.customerId },
						],
					},
				],
			},
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
		const appointments = await prisma.appointment.findFirst({
			where: {
				OR: [
					{
						AND: [
							{ start_date: { lte: data.startDate } },
							{ end_date: { gte: data.startDate } },
							{ doctor_id: data.doctorId },
							{ patient_id: data.patientId },
						]
					},
					{
						AND: [
							{ start_date: { lte: data.endDate } },
							{ end_date: { gte: data.endDate } },
							{ doctor_id: data.doctorId },
							{ patient_id: data.patientId },
						]
					}
				]
			}
		});
		
		return appointments;
	}
  
}
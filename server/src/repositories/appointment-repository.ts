import { FindByDateRequest, PrismaCreateAppointment } from '@DTO/appointment';
import { Appointment } from '@prisma/client';

export interface AppointmentRepository {
  create(data: PrismaCreateAppointment): Promise<void>
  findByDate(data: FindByDateRequest): Promise<Appointment | null>;
  listByCustomer(patientId: string, doctorId: string): Promise<Appointment[] | null> 
}
import { IFindByDateRequest, IPrismaCreateAppointment } from '@DTO/appointment';
import { Appointment } from '@prisma/client';

export interface AppointmentRepository {
  create(data: IPrismaCreateAppointment): Promise<void>
  findByDate(data: IFindByDateRequest): Promise<Appointment | null>;
  listByCustomer(customerId: string): Promise<Appointment[] | null> 
}
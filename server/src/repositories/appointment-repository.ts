import { IFindByDateRequest, IListByCustomer, IPrismaCreateAppointment } from '@DTO/appointment';
import { Appointment } from '@prisma/client';

export interface AppointmentRepository {
  create(data: IPrismaCreateAppointment): Promise<void>
  findByDate(data: IFindByDateRequest): Promise<Appointment | null>;
  listByCustomer(data: IListByCustomer): Promise<Appointment[] | null> 
}
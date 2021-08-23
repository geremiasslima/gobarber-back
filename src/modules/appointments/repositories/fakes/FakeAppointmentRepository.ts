

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO'
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO'
import { v4 as uuid } from 'uuid';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';


class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];
   public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
     const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date) &&
     appointment.provider_id === provider_id,
     );

     return findAppointment;
   }

   public async findAllInMonthFromProvider({
     provider_id,
     month,
     year,

    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return(
      appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
      );

    });

    return appointments;
   }
   public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
   }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
   const appointments = this.appointments.filter(appointment => {
     return(
     appointment.provider_id === provider_id &&
     getDate(appointment.date) === day &&
     getMonth(appointment.date) + 1 === month &&
     getYear(appointment.date) === year
     );

   });

   return appointments;
  }


  public async create({provider_id, user_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id})  ;

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository;

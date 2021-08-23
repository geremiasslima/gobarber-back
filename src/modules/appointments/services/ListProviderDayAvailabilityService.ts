import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns'
import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;

}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentData = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hashAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

     const compareDate= new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hashAppointmentInHour && isAfter(compareDate, currentData)
      }
    });

    return availability;

  }
}

export default ListProviderDayAvailabilityService;

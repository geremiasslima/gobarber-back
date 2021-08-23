import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';


let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments : ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );

  });

  it('should be able to list the day availability from provider', async () => {
    const appointments1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0)
    })
    const appointments2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0)
    })

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 5,
      day: 20,
    })

    expect(appointments).toEqual([appointments1, appointments2])
  });
});


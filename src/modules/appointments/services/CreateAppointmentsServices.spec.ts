import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentsService from './CreateAppointmentsServices';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12312123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12312123');
  });
});

describe('CreateAppointment', () => {
  it('should not be able to create two appointments to the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: new Date(),
      provider_id: '12312123',
    });

    expect(
      createAppointment.execute({
        date: new Date(),
        provider_id: '12312123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

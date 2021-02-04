/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentsService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentsService;

import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentsServices';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// insert as next function in all middlewares
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', (request, response) => {
//   const appointments = appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentsServices(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;

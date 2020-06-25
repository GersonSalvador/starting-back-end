import { Router } from 'express';
import appointmaentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmaentsRouter);
// routes.use('/appointments', (reques, response) => {
//   return response.json({ message: 'Got here' });
// });

export default routes;

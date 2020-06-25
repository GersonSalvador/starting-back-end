import { Router } from 'express';
import appointmaentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmaentsRouter);

export default routes;

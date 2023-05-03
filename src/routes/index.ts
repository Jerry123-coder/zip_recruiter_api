import { Router } from 'express';
import applicantRouter from './applicants.routes';
import recruiterRouter from './recruiters.routes';



const routes = Router();


routes.use('/applicants',  applicantRouter);
routes.use('/recruiters',  recruiterRouter);
// routes.use('/dashboard',  dashboardRouter);
// routes.use('/delivery',  deliveryRouter);
// routes.use('/analytics',  analyticsRouter);
export default routes;
import { Router } from 'express';
import { userRoutes } from '../modules/User/User.route';
import { doctorRoutes } from '../modules/Doctor/Doctor.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/doctor',
    route: doctorRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

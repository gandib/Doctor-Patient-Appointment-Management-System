import { Router } from 'express';
import { userRoutes } from '../modules/User/User.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

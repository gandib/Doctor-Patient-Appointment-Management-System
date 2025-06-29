import { Router } from 'express';
import { userRoutes } from '../modules/User/User.route';
import { doctorRoutes } from '../modules/Doctor/Doctor.route';
import { appointmentRoutes } from '../modules/Appointment/Appointment.route';
import { patientRoutes } from '../modules/Patient/Patient.route';
import { adminDashboardRoutes } from '../modules/AdminDashboard/AdminDashboard.route';

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
  {
    path: '/patient',
    route: patientRoutes,
  },
  {
    path: '/appointments',
    route: appointmentRoutes,
  },
  {
    path: '/admin-dashboard',
    route: adminDashboardRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

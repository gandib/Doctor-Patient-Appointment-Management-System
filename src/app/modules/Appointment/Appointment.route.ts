import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { appointmentValidations } from './Appointment.validation';
import { appointmentControllers } from './Appointment.controller';

const router = express.Router();

router.post(
  '/',
  auth('Patient'),
  validateRequest(appointmentValidations.createAppointmentSchema),
  appointmentControllers.createAppointment,
);

export const appointmentRoutes = router;

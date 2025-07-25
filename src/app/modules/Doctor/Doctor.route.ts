import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { doctorValidations } from './Doctor.validation';
import { doctorControllers } from './Doctor.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/services',
  auth('Doctor'),
  validateRequest(doctorValidations.createServiceValidation),
  doctorControllers.createService,
);

router.patch(
  '/services/:id',
  auth('Doctor'),
  validateRequest(doctorValidations.updateServiceValidation),
  doctorControllers.updateService,
);

router.post(
  '/availability',
  auth('Doctor'),
  validateRequest(doctorValidations.createDoctorAvailabilityValidation),
  doctorControllers.createDoctorAvailability,
);

router.delete('/services/:id', auth('Doctor'), doctorControllers.deleteService);

router.get(
  '/appointments',
  auth('Doctor'),
  doctorControllers.getAllAppointments,
);

router.patch(
  '/appointments/:id/status',
  auth('Doctor'),
  validateRequest(doctorValidations.updateAppointmentStatus),
  doctorControllers.updateAppointment,
);

export const doctorRoutes = router;

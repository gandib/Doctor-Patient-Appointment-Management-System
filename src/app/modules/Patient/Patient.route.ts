import express from 'express';
import auth from '../../middlewares/auth';
import { patientControllers } from './Patient.controller';

const router = express.Router();

router.get(
  '/appointments',
  auth('Patient'),
  patientControllers.getAllAppointments,
);

export const patientRoutes = router;

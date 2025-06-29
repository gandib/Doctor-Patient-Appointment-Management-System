import express from 'express';
import auth from '../../middlewares/auth';
import { patientControllers } from './Patient.controller';

const router = express.Router();

router.get(
  '/appointments',
  auth('Patient'),
  patientControllers.getAllAppointments,
);

router.get(
  '/',
  auth('Patient', 'Doctor', 'Admin'),
  patientControllers.getAllDoctors,
);

export const patientRoutes = router;

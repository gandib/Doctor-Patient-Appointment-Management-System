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
  '/doctors',
  auth('Patient', 'Doctor', 'Admin'),
  patientControllers.getAllDoctors,
);

router.get(
  '/doctors/:id',
  auth('Patient', 'Doctor', 'Admin'),
  patientControllers.getSingleDoctor,
);

export const patientRoutes = router;

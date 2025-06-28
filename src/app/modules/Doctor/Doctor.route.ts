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

export const doctorRoutes = router;

import express, { NextFunction, Request, Response } from 'express';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './User.validation';
import { userControllers } from './User.controller';

const router = express.Router();

router.post(
  '/register-doctor',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidations.createDoctorValidation),
  userControllers.createDoctor,
);

router.post(
  '/register-patient',
  validateRequest(userValidations.createPatientValidation),
  userControllers.createPatient,
);

export const userRoutes = router;

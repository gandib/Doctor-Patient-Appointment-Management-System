import express from 'express';
import auth from '../../middlewares/auth';
import { adminDahboardControllers } from './AdminDashboard.controller';

const router = express.Router();

router.get('/', auth('Admin'), adminDahboardControllers.getAdminMetaData);

export const adminDashboardRoutes = router;

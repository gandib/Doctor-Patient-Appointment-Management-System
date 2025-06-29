import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './User.service';

const createDoctor = catchAsync(async (req, res) => {
  const result = await userServices.createDoctor(req.file, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor registered successfully',
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await userServices.createPatient(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const result = await userServices.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

export const userControllers = {
  createDoctor,
  createPatient,
  loginUser,
  createAdmin,
};

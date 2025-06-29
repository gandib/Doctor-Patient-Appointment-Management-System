import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { doctorServices } from './Doctor.service';

const createService = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await doctorServices.createService(req.body, user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await doctorServices.updateService(req.body, id, user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await doctorServices.deleteService(id, user._id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

const createDoctorAvailability = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await doctorServices.createDoctorAvailability(
    req.body,
    user._id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor availability created successfully',
    data: result,
  });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const result = await doctorServices.getAllAppointments(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

export const doctorControllers = {
  createService,
  updateService,
  deleteService,
  createDoctorAvailability,
  getAllAppointments,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { patientServices } from './Patient.service';

const getAllAppointments = catchAsync(async (req, res) => {
  const result = await patientServices.getAllAppointments(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getAllDoctors = catchAsync(async (req, res) => {
  const result = await patientServices.getAllDoctors(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctors are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleDoctor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await patientServices.getSingleDoctor(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctor is retrieved successfully!',
    data: result,
  });
});

export const patientControllers = {
  getAllAppointments,
  getAllDoctors,
  getSingleDoctor,
};

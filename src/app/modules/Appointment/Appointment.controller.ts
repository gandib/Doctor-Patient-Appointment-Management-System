import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { appointmentServices } from './Appointment.service';

const createAppointment = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await appointmentServices.createAppointment(
    req.body,
    user._id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment created successfully',
    data: result,
  });
});

export const appointmentControllers = {
  createAppointment,
};

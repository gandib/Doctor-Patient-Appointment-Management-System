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

export const doctorControllers = {
  createService,
  updateService,
  deleteService,
};

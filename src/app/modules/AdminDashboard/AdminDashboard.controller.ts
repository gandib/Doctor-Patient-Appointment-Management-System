import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminDashboardServices } from './AdminDashboard.service';

const getAdminMetaData = catchAsync(async (req, res) => {
  const result = await adminDashboardServices.getAdminMetaData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin dashboard meta generated successfully',
    data: result,
  });
});

export const adminDahboardControllers = {
  getAdminMetaData,
};

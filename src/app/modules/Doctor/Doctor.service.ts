import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TService } from './Doctor.interface';
import { Doctor, Service } from './Doctor.model';
import { Types } from 'mongoose';

const createService = async (payload: TService, userId: string) => {
  const doctor = await Doctor.findOne({ user: userId });

  if (!doctor) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found!');
  }

  if (doctor) {
    payload.doctor = doctor._id as unknown as Types.ObjectId;
  }

  const result = await Service.create(payload);
  return result;
};

const updateService = async (
  payload: Partial<TService>,
  id: string,
  userId: string,
) => {
  // Find DoctorId
  const doctorId = await Doctor.findOne({ user: userId }).select('_id');

  // Find doctorId from service
  const doctorIdFromService = await Service.findById(id).select('doctor');

  // Compare doctorId from token to doctorIdFromService. To check service is created by this doctor or not.
  if (String(doctorId?._id) !== String(doctorIdFromService?.doctor)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteService = async (id: string, userId: string) => {
  // Find DoctorId
  const doctorId = await Doctor.findOne({ user: userId }).select('_id');

  // Find doctorId from service
  const doctorIdFromService = await Service.findById(id).select('doctor');

  // Compare doctorId from token to doctorIdFromService. To check service is created by this doctor or not.
  if (String(doctorId?._id) !== String(doctorIdFromService?.doctor)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const result = await Service.findByIdAndDelete(id, { new: true });
  return result;
};

export const doctorServices = {
  createService,
  updateService,
  deleteService,
};

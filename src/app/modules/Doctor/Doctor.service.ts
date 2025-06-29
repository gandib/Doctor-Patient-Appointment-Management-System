import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TDoctorAvailability, TService } from './Doctor.interface';
import { Doctor, DoctorAvailability, Service } from './Doctor.model';
import { Types } from 'mongoose';
import { generateTimeSlots } from '../../utils/generateTimeSlot';

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

const createDoctorAvailability = async (
  payload: TDoctorAvailability,
  userId: string,
) => {
  const doctor = await Doctor.findOne({ user: userId }).select('_id');
  const service = await Service.findById(payload.serviceId);

  if (!doctor?._id) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor is not found!');
  }

  payload.doctorId = doctor?._id as unknown as Types.ObjectId;

  if (!service?._id) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service is not found!');
  }

  for (let i = 0; i < payload.weeklyAvailability.length; i++) {
    const timeRanges = payload.weeklyAvailability[i].timeSlots;

    // Flatten all generated slots for each time range
    const slots = timeRanges.flatMap((range: string) =>
      generateTimeSlots(range, 30),
    );

    // Replace the timeSlots with the generated slots
    payload.weeklyAvailability[i].timeSlots = slots;
  }

  const result = await DoctorAvailability.create(payload);
  return result;
};

export const doctorServices = {
  createService,
  updateService,
  deleteService,
  createDoctorAvailability,
};

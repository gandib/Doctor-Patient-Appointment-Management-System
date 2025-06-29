import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TAppointment } from './Appointment.interface';
import { Doctor, DoctorAvailability, Service } from '../Doctor/Doctor.model';
import { Appointment } from './Appointment.model';
import { Patient } from '../Patient/Patient.model';
import { Types } from 'mongoose';

const createAppointment = async (payload: TAppointment, userId: string) => {
  const patient = await Patient.findOne({ user: userId });
  const doctor = await Doctor.findById(payload.doctorId);
  const service = await Service.findById(payload.serviceId);

  if (!patient) {
    throw new AppError(httpStatus.NOT_FOUND, 'Patient not found');
  }
  if (!doctor) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // Check if the doctor is available on that day
  const dayName = new Date(
    payload.selectedDate as unknown as Date,
  ).toLocaleString('en-US', { weekday: 'long' });

  const availability = await DoctorAvailability.findOne({
    doctorId: payload.doctorId,
    serviceId: payload.serviceId,
    'weeklyAvailability.day': dayName,
    'weeklyAvailability.timeSlots': payload.timeSlot,
  });

  if (!availability) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Doctor is not available on this day or time.',
    );
  }

  // Check if this slot is already booked
  const alreadyBooked = await Appointment.findOne({
    doctorId: payload.doctorId,
    selectedDate: payload.selectedDate,
    timeSlot: payload.timeSlot,
    status: { $in: ['pending', 'accepted', 'completed'] },
  });

  if (alreadyBooked) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This time slot is already booked.',
    );
  }

  // set patient id
  payload.patientId = patient._id as unknown as Types.ObjectId;

  const result = await Appointment.create(payload);
  return result;
};

export const appointmentServices = {
  createAppointment,
};

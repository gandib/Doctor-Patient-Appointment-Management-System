import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { Patient } from '../Patient/Patient.model';
import { TAppointment } from './Appointment.interface';
import { DoctorAvailability } from '../Doctor/Doctor.model';
import { Appointment } from './Appointment.model';

const createAppointment = async (payload: TAppointment, patientId: string) => {
  const patient = await Patient.findById(patientId);
  const doctor = await Patient.findById(payload.doctorId);
  const service = await Patient.findById(payload.serviceId);

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
    dayOfWeek: dayName,
    timeSlots: payload.timeSlot,
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
    status: { $in: ['pending', 'accepted'] },
  });

  if (alreadyBooked) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This time slot is already booked.',
    );
  }

  const result = await Appointment.create(payload);
  return result;
};

export const appointmentServices = {
  createAppointment,
};

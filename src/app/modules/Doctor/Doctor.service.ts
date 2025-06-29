import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TDoctorAvailability, TService } from './Doctor.interface';
import { Doctor, DoctorAvailability, Service } from './Doctor.model';
import { Types } from 'mongoose';
import { generateTimeSlots } from '../../utils/generateTimeSlot';
import QueryBuilder from '../../builder/QueryBuilder';
import { Appointment } from '../Appointment/Appointment.model';
import { appointmentSearchableFields } from '../Appointment/Appointment.constant';
import { TAppointment } from '../Appointment/Appointment.interface';
import { sendEmail } from '../../utils/sendEmail';
import { Patient } from '../Patient/Patient.model';
import { User } from '../User/User.model';

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

  // set doctor id
  payload.doctorId = doctor?._id as unknown as Types.ObjectId;

  if (!service?._id) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service is not found!');
  }

  // generate 30 minutes interval time slots from given time range
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

const getAllAppointments = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Appointment.find().populate([
      {
        path: 'doctorId',
        populate: { path: 'user' },
      },
      {
        path: 'serviceId',
      },
      {
        path: 'patientId',
      },
    ]),
    query,
  )
    .search(appointmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();

  return {
    meta,
    result,
  };
};

const updateAppointment = async (
  payload: Partial<TAppointment>,
  appointmentId: string,
  userId: string,
) => {
  // Find Doctor
  const doctor = await Doctor.findOne({ user: userId });

  // find doctor as user
  const doctorAsUser = await User.findById(doctor?.user);

  // Find doctorId from appointment
  const doctorIdFromAppointment = await Appointment.findById(appointmentId);

  const patient = await Patient.findById(doctorIdFromAppointment?.patientId);
  const patientEmail = await User.findById(patient?.user);

  // Compare doctorId from token to doctorIdFromAppointment. To check appointment is related to that doctor or not.
  if (String(doctor?._id) !== String(doctorIdFromAppointment?.doctorId)) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const result = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: payload.status },
    {
      new: true,
    },
  );

  const htmlBody = '';

  if (payload.status === 'accepted') {
    await sendEmail(
      patientEmail?.email as string,
      htmlBody,
      doctorAsUser?.name as string,
      doctorIdFromAppointment?.timeSlot as string,
    );
  }

  return result;
};

export const doctorServices = {
  createService,
  updateService,
  deleteService,
  createDoctorAvailability,
  getAllAppointments,
  updateAppointment,
};

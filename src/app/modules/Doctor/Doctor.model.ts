import { model, Schema } from 'mongoose';
import {
  TDoctor,
  TDoctorAvailability,
  TService,
  TWeeklyAvailability,
} from './Doctor.interface';

const doctorSchema = new Schema<TDoctor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
    },
    hospitalName: {
      type: String,
      required: [true, 'Hospital name is required'],
    },
    hospitalFloor: {
      type: String,
      required: [true, 'Hospital floor is required'],
    },
    profileImage: { type: String, default: '' },
  },
  { timestamps: true },
);

// For services
const serviceSchema = new Schema<TService>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      required: [true, 'Doctor Id is required'],
      ref: 'Doctor',
    },
    title: { type: String, required: [true, 'Title is required!'] },
    description: { type: String, required: [true, 'Description is required!'] },
    price: { type: Number, required: [true, 'Price is required!'] },
    duration: { type: Number, required: [true, 'Duration is required!'] },
  },
  { timestamps: true },
);

// For Doctor weekly availability
const WeeklyAvailabilitySchema = new Schema<TWeeklyAvailability>({
  day: {
    type: String,
    required: true,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },
  timeSlots: {
    type: [String],
    required: true,
  },
});

const doctorAvailabilitySchema = new Schema<TDoctorAvailability>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Doctor Id is required'],
      ref: 'Doctor',
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Service Id is required'],
      ref: 'Service',
    },
    weeklyAvailability: {
      type: [WeeklyAvailabilitySchema],
      default: [],
    },
  },
  { timestamps: true },
);

export const Doctor = model<TDoctor>('Doctor', doctorSchema);

export const Service = model<TService>('Service', serviceSchema);

export const DoctorAvailability = model<TDoctorAvailability>(
  'DoctorAvailability',
  doctorAvailabilitySchema,
);

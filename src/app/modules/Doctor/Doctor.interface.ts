import { Types } from 'mongoose';

export type TDoctor = {
  _id?: string;
  user: Types.ObjectId;
  specialization: string;
  hospitalName: string;
  hospitalFloor: string;
  profileImage: string;
};

export type TService = {
  doctor: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number;
};

export type TWeeklyAvailability = {
  day: string;
  timeSlots: string[];
};

export type TDoctorAvailability = {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  weeklyAvailability: TWeeklyAvailability[];
};

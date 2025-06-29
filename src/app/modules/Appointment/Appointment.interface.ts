import { Date, Types } from 'mongoose';

export type TAppointment = {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  patientId: Types.ObjectId;
  selectedDate: Date;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'cancelled';
};

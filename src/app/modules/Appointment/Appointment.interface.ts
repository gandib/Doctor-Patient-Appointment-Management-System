import { Date, Types } from 'mongoose';

export type TAppointment = {
  payload: globalThis.Date;
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  patientId: Types.ObjectId;
  selectedDate: Date;
  timeSlot: string;
  status: 'pending' | 'accepted' | 'cancelled';
};

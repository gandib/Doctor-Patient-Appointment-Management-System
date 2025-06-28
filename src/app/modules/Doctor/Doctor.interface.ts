import { Types } from 'mongoose';

export type TDoctor = {
  _id?: string;
  user: Types.ObjectId;
  specialization: string;
  hospitalName: string;
  hospitalFloor: string;
  profileImage: string;
};

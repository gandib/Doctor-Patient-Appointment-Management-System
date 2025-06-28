import { model, Schema } from 'mongoose';
import { TDoctor } from './Doctor.interface';

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

export const Doctor = model<TDoctor>('Doctor', doctorSchema);

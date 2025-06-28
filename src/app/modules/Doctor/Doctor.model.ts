import { model, Schema } from 'mongoose';
import { TDoctor, TService } from './Doctor.interface';

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
const serviceSchema = new Schema<TService>({
  doctor: {
    type: Schema.Types.ObjectId,
    required: [true, 'Doctor Id is required'],
    ref: 'Doctor',
  },
  title: { type: String, required: [true, 'Title is required!'] },
  description: { type: String, required: [true, 'Description is required!'] },
  price: { type: Number, required: [true, 'Price is required!'] },
  duration: { type: Number, required: [true, 'Duration is required!'] },
});

export const Doctor = model<TDoctor>('Doctor', doctorSchema);

export const Service = model<TService>('Service', serviceSchema);

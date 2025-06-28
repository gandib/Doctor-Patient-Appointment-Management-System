import { model, Schema } from 'mongoose';
import { TPatient } from './Patient.interface';

const patientSchema = new Schema<TPatient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
  },
  { timestamps: true },
);

export const Patient = model<TPatient>('Patient', patientSchema);

import { model, Schema } from 'mongoose';
import { TAppointment } from './Appointment.interface';

const appointmentSchema = new Schema<TAppointment>(
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
    patientId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Patient Id is required'],
      ref: 'Patient',
    },
    selectedDate: { type: Date, required: [true, 'Date is required!'] },
    timeSlot: { type: String, required: [true, 'Time slot is required!'] },
    status: {
      type: String,
      required: [true, 'Price is required!'],
      enum: ['pending', 'accepted', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Appointment = model<TAppointment>(
  'Appointment',
  appointmentSchema,
);

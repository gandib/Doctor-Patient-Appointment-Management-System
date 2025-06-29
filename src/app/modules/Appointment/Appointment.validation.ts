import { z } from 'zod';

const createAppointmentSchema = z.object({
  body: z.object({
    doctorId: z.string({ required_error: 'Doctor Id is required!' }),
    serviceId: z.string({ required_error: 'Service Id is required!' }),
    selectedDate: z.date({ required_error: 'Date Id is required!' }),
    timeSlot: z.string({ required_error: 'Time slot is required!' }),
    status: z.enum(['pending', 'accepted', 'cancelled']),
  }),
});

export const appointmentValidations = {
  createAppointmentSchema,
};

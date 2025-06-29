import { z } from 'zod';

const createServiceValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    description: z.string({ required_error: 'Description is required!' }),
    price: z.number({ required_error: 'Price is required!' }),
    duration: z.number({ required_error: 'Duration is required!' }),
  }),
});

const updateServiceValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
  }),
});

const createDoctorAvailabilityValidation = z.object({
  body: z.object({
    serviceId: z.string({ required_error: 'Service Id is required!' }),
    weeklyAvailability: z.array(
      z.object({
        day: z.enum(
          [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          { required_error: 'Day is required!' },
        ),
        timeSlots: z.array(
          z.string({ required_error: 'Time slot is required!' }),
        ),
      }),
    ),
  }),
});

const updateAppointmentStatus = z.object({
  body: z.object({
    status: z.enum(['pending', 'accepted', 'cancelled', 'completed'], {
      required_error: 'Appointment status is required!',
    }),
  }),
});

export const doctorValidations = {
  createServiceValidation,
  updateServiceValidation,
  createDoctorAvailabilityValidation,
  updateAppointmentStatus,
};

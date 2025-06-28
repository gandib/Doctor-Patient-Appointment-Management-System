import { z } from 'zod';

const createDoctorValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }),
    phone: z.string({ required_error: 'Phone number is required!' }),
    specialization: z.string({ required_error: 'Specialization is required!' }),
    hospitalName: z.string({ required_error: 'Hospital name is required!' }),
    hospitalFloor: z.string({ required_error: 'Hospital floor is required!' }),
  }),
});

const createPatientValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }),
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }),
    phone: z.string({ required_error: 'Phone number is required!' }),
    age: z.number({ required_error: 'Age is required!' }),
    gender: z.enum(['Male', 'Female', 'Other']),
  }),
});

export const userValidations = {
  createDoctorValidation,
  createPatientValidation,
};

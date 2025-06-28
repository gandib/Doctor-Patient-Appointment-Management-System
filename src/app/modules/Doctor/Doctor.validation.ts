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

export const doctorValidations = {
  createServiceValidation,
  updateServiceValidation,
};

import { z } from 'zod';

const createServiceValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    description: z.string({ required_error: 'Description is required!' }),
    price: z.number({ required_error: 'Price is required!' }),
    duration: z.number({ required_error: 'Duration is required!' }),
  }),
});

export const doctorValidations = {
  createServiceValidation,
};

import { TService } from './Doctor.interface';
import { Service } from './Doctor.model';

const createService = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

export const doctorServices = {
  createService,
};

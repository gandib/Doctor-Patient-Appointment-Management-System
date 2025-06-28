import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TService } from './Doctor.interface';
import { Service } from './Doctor.model';

const createService = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const updateService = async (payload: Partial<TService>, id: string) => {
  const service = await Service.findById(id);

  // If service not found then throw an error
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const doctorServices = {
  createService,
  updateService,
};

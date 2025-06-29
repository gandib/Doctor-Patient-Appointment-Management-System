/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { appointmentSearchableFields } from '../Appointment/Appointment.constant';
import { Appointment } from '../Appointment/Appointment.model';
import { Doctor } from '../Doctor/Doctor.model';

const getAllAppointments = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Appointment.find().populate([
      {
        path: 'doctorId',
        populate: { path: 'user' },
      },
      {
        path: 'serviceId',
      },
      {
        path: 'patientId',
      },
    ]),
    query,
  )
    .search(appointmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAllDoctors = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    search,
    specialization,
    hospitalName,
    serviceName,
  } = query;

  const filters: any = {};

  if (search) {
    filters['$or'] = [
      { 'user.name': { $regex: search, $options: 'i' } },
      { 'user.email': { $regex: search, $options: 'i' } },
    ];
  }

  const pageNumber = parseInt(page as string) || 1;
  const pageSize = parseInt(limit as string) || 10;
  const skip = (pageNumber - 1) * pageSize;

  const result = await Doctor.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $lookup: {
        from: 'services',
        localField: '_id',
        foreignField: 'doctor',
        as: 'services',
      },
    },
    {
      $lookup: {
        from: 'doctoravailabilities',
        localField: '_id',
        foreignField: 'doctorId',
        as: 'availability',
      },
    },
    {
      $match: {
        ...(specialization ? { specialization } : {}),
        ...(hospitalName ? { hospitalName } : {}),
        ...(serviceName
          ? {
              services: {
                $elemMatch: {
                  title: { $regex: serviceName, $options: 'i' },
                },
              },
            }
          : {}),
      },
    },
    {
      $facet: {
        meta: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: pageSize }],
      },
    },
  ]);

  const total = result[0]?.meta[0]?.total || 0;
  const totalPage = Math.ceil(total / pageSize);

  return {
    meta: {
      page: pageNumber,
      limit: pageSize,
      total,
      totalPage,
    },
    result: result[0]?.data || [],
  };
};

export const patientServices = {
  getAllAppointments,
  getAllDoctors,
};

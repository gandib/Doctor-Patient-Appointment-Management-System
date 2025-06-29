import QueryBuilder from '../../builder/QueryBuilder';
import { appointmentSearchableFields } from '../Appointment/Appointment.constant';
import { Appointment } from '../Appointment/Appointment.model';

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

export const patientServices = {
  getAllAppointments,
};

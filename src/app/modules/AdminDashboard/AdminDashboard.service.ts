import { Appointment } from '../Appointment/Appointment.model';
import { Doctor } from '../Doctor/Doctor.model';
import { Patient } from '../Patient/Patient.model';

const getAdminMetaData = async () => {
  const appointmentCount = await Appointment.estimatedDocumentCount();
  const patientCount = await Patient.estimatedDocumentCount();
  const doctorCount = await Doctor.estimatedDocumentCount();

  return {
    totalAppointmentCount: appointmentCount,
    totalPatientCount: patientCount,
    totalDoctorCount: doctorCount,
  };
};

export const adminDashboardServices = {
  getAdminMetaData,
};

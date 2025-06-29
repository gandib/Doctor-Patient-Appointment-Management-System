import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (
  to: string,
  html: string,
  doctor: string,
  timeSlot: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    // secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.gmail_app_email,
      pass: config.gmail_app_password,
    },
  });

  await transporter.sendMail({
    from: `"Doctor-Patient Appointment Management System" <${config.sender_email}>`, // sender address
    to, // list of receivers
    subject: 'Doctor updated your appointment status', // Subject line
    text: `Hi! Welcome to Doctor-Patient Appointment Management System. Dr. ${doctor} confirmed your appointment at ${timeSlot}. Thanks for booking.`, // plain text body
    html, // html body
  });
};

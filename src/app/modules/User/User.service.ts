/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TGender, TLoginUser, TUser } from './User.interface';
import { User } from './User.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { Doctor } from '../Doctor/Doctor.model';
import { userRole } from './User.constant';
import { Patient } from '../Patient/Patient.model';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config';

const createDoctor = async (
  file: any,
  payload: TUser & {
    specialization: string;
    hospitalName: string;
    hospitalFloor: string;
    profileImage: string;
  },
) => {
  const userData = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    phone: payload.phone,
    role: userRole.Doctor,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      payload.profileImage = file?.path;
    }

    // create an user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create an user!');
    }

    const doctorData = {
      user: newUser[0]._id,
      specialization: payload.specialization,
      hospitalName: payload.hospitalName,
      hospitalFloor: payload.hospitalFloor,
      profileImage: payload.profileImage,
    };

    // create a Doctor (transaction-2)
    const newDoctor = await Doctor.create([doctorData], { session });

    if (!newDoctor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create a doctor!');
    }

    // populate user data
    const doctor = Doctor.findById(newDoctor[0]._id).populate('user');

    // permanently save to database, because user and doctor created successfully
    await session.commitTransaction();
    await session.endSession();

    return doctor;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const createPatient = async (
  payload: TUser & {
    age: number;
    gender: TGender;
  },
) => {
  const userData = {
    name: payload.name,
    email: payload.email,
    password: payload.password,
    phone: payload.phone,
    role: userRole.Patient,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create an user (transaction-1)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create an user!');
    }

    const patientData = {
      user: newUser[0]._id,
      age: payload.age,
      gender: payload.gender,
    };

    // create a Patient (transaction-2)
    const newPatient = await Patient.create([patientData], { session });

    if (!newPatient.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create a patient!');
    }

    // populate user data
    const patient = Patient.findById(newPatient[0]._id).populate('user');

    // permanently save to database, because user and doctor created successfully
    await session.commitTransaction();
    await session.endSession();

    return patient;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email);

  // checking if password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Credential is not matched!');
  }

  const jwtPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  // expiresIn: SignOptions['expiresIn'],
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as Secret, {
    expiresIn: config.jwt_access_expire_in as SignOptions['expiresIn'],
  });

  return token;
};

export const userServices = {
  createDoctor,
  createPatient,
  loginUser,
};

import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './User.interface';
import { role } from './User.constant';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/appError';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: [true, 'Name is required!'] },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required!'],
      unique: true,
    },
    role: {
      type: String,
      enum: {
        values: role,
        message: '{VALUE} is not valid!',
      },
    },
  },
  { timestamps: true },
);

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);

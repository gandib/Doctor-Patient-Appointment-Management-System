import { Model } from 'mongoose';

export type TUserRole = 'Doctor' | 'Patient' | 'Admin';
export type TGender = 'Male' | 'Female' | 'Other';

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TUserRole;
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

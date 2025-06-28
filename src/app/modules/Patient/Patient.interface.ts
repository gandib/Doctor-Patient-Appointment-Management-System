import { Types } from 'mongoose';
import { TGender } from '../User/User.interface';

export type TPatient = {
  _id?: string;
  user: Types.ObjectId;
  age: number;
  gender: TGender;
};

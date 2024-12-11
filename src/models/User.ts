import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  imageURL?: string;
  role: 'admin' | 'user';
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageURL: { type: String },
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);

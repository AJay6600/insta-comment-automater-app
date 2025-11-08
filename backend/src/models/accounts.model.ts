import mongoose, { Document, Schema } from 'mongoose';

export interface UserModelType extends Document {
  userName: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accountsSchema = new Schema<UserModelType>(
  {
    userName: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

accountsSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Account = mongoose.model<UserModelType>('Account', accountsSchema);

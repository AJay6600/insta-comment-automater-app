import { RequestHandler } from 'express';
import { AccountDataType, ErrorMessageResponseType } from '../../utils/types';
import { AppError } from '../../middlewares/errorHandler';
import { Account } from '../../models/accounts.model';
import bcrypt from 'bcrypt';
import { instagramLoginScript } from '../../utils/helpers/instagramLoginScript';

type AddAccountRequestBodyType = {
  userName: string;
  password: string;
};

type AddAccountResponseType = {
  account: AccountDataType;
  message: string;
};

const addAccount: RequestHandler<
  unknown,
  AddAccountResponseType | ErrorMessageResponseType,
  AddAccountRequestBodyType
> = async (request, response, next) => {
  try {
    const { userName, password } = request.body;

    if (!userName || !password) {
      const error: AppError = new Error('Username and password is required');

      error.status = 400;
      throw error;
    }

    /** check is there existing account present */
    const existingAccount = await Account.findOne({ userName });

    if (existingAccount) {
      const error: AppError = new Error('Account already exist');

      error.status = 400;
      throw error;
    }

    /** Run the script to login in account to check that user name and password is correct */
    const scriptResponse = await instagramLoginScript({ userName, password });

    if (!scriptResponse.isSuccessful) {
      const error: AppError = new Error(scriptResponse.message);

      error.status = 401;
      throw error;
    }

    /** Hash the password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /** Add account account in db */
    const newAccount = await Account.create({
      userName,
      password: hashedPassword,
    });

    response.status(201).json({
      message: 'Account added successfully',
      account: {
        id: newAccount._id as string,
        userName: newAccount.userName,
        isActive: newAccount.isActive,
        createdAt: newAccount.createdAt,
        updatedAt: newAccount.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default addAccount;

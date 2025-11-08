import { RequestHandler } from 'express';
import { ErrorMessageResponseType, AccountDataType } from '../../utils/types';
import { AppError } from '../../middlewares/errorHandler';
import { Account } from '../../models/accounts.model';
import bcrypt from 'bcrypt';

type UpdateAccountRequestParamsType = {
  id: string;
};

type UpdateAccountRequestBodyType = {
  userName?: string;
  password?: string;
  isActive?: boolean;
};

type UpdateAccountResponseType = {
  account: AccountDataType;
  message: string;
};

const updateAccount: RequestHandler<
  UpdateAccountRequestParamsType,
  UpdateAccountResponseType | ErrorMessageResponseType,
  UpdateAccountRequestBodyType
> = async (request, response, next) => {
  try {
    const { id } = request.params;

    const { userName, password, isActive } = request.body;

    // Check if ID is provided
    if (!id) {
      const error: AppError = new Error('Account ID is required');
      error.status = 400;
      throw error;
    }

    // Find existing Account
    const existingAccount = await Account.findById(id);
    if (!existingAccount) {
      const error: AppError = new Error('Account not found');
      error.status = 404;
      throw error;
    }

    // Update only provided fields
    if (userName !== undefined) existingAccount.userName = userName;
    if (typeof isActive === 'boolean') existingAccount.isActive = isActive;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingAccount.password = hashedPassword;
    }

    await existingAccount.save();

    response.status(200).json({
      message: 'User updated successfully',
      account: {
        id: existingAccount._id as string,
        userName: existingAccount.userName,
        isActive: existingAccount.isActive,
        createdAt: existingAccount.createdAt,
        updatedAt: existingAccount.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default updateAccount;

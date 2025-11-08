import { RequestHandler } from 'express';
import { ErrorMessageResponseType, AccountDataType } from '../../utils/types';
import { AppError } from '../../middlewares/errorHandler';
import { Account } from '../../models/accounts.model';

type GetAllAccountsResponseType = {
  accounts: AccountDataType[];
  message: string;
};

const getAllAccounts: RequestHandler<
  unknown,
  GetAllAccountsResponseType | ErrorMessageResponseType,
  unknown
> = async (_request, response, next) => {
  try {
    const accounts = await Account.find();

    const formattedAccounts: AccountDataType[] =
      accounts && Array.isArray(accounts) && accounts.length > 0
        ? accounts.map((account) => ({
            id: account._id as string,
            userName: account.userName,
            isActive: account.isActive,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
          }))
        : [];

    response.status(200).json({
      message:
        formattedAccounts.length > 0
          ? 'Accounts fetched successfully'
          : 'No Account found',
      accounts: formattedAccounts,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllAccounts;

import { RequestHandler } from 'express';
import { ErrorMessageResponseType } from '../../utils/types';
import { AppError } from '../../middlewares/errorHandler';
import { Account } from '../../models/accounts.model';

type DeleteAccountRequestParamsType = {
  id: string;
};

type DeleteAccountResponseType = {
  message: string;
};

const deleteAccount: RequestHandler<
  DeleteAccountRequestParamsType,
  DeleteAccountResponseType | ErrorMessageResponseType,
  unknown
> = async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      const error: AppError = new Error('Account ID is required');
      error.status = 400;
      throw error;
    }

    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      const error: AppError = new Error('Account not found');
      error.status = 404;
      throw error;
    }

    response.status(200).json({
      message: 'Account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteAccount;

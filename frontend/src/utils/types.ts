/** Type for instagram account details type */
export type InstagramAccountDetailsType = {
  id: string;
  userName: string;
  isActive: boolean;
};

/** Type for the commenter setting */
export type CommenterSettingType = {
  numberOfComment: number;
  selectedAccounts: InstagramAccountDetailsType[];
};

export type CommentsPerSelectedAccountsDataType =
  InstagramAccountDetailsType & { comments: string[] };

/** type for add account api response type  */
export type AccountDataType = {
  id: string;
  userName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddAccountResponseType = {
  message: string;
  account: AccountDataType;
};

/** type for the add account payload  */
export type AddAccountPayload = {
  userName: string;
  password: string;
};

export type GetAllAccountsResponseType = {
  message: string;
  accounts: AccountDataType[];
};

/** Type for the update account response */
export type UpdateAccountResponseType = {
  message: string;
  account: AccountDataType;
};

/** Type for the update account request body type */
export type UpdateAccountRequestBodyType = {
  userName?: string;
  password?: string;
  isActive?: boolean;
};

export type HandleIsActivePropsType = {
  accountId: string;
  isActive: boolean;
};

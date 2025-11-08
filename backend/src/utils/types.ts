/** Type definition for error message response */
export type ErrorMessageResponseType = { message: string };

/** Type for the account data */
export type AccountDataType = {
  id: string;
  userName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

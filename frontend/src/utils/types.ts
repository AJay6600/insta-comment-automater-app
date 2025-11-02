/** Type for instagram account details type */
export type InstagramAccountDetailsType = {
  userName: string;
  password: string;
  isActive: boolean;
};

/** Type for the commenter setting */
export type CommenterSettingType = {
  numberOfComment: number;
  selectedAccounts: InstagramAccountDetailsType[];
};

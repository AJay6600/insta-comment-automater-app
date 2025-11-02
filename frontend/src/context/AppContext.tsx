import { createContext, useContext, useState } from "react";
import type {
  CommenterSettingType,
  InstagramAccountDetailsType,
} from "../utils/types";

type AppContextType = {
  instagramAccounts: InstagramAccountDetailsType[];
  setInstagramAccounts: React.Dispatch<
    React.SetStateAction<InstagramAccountDetailsType[]>
  >;
  commenterSetting: CommenterSettingType;
  setCommenterSetting: React.Dispatch<
    React.SetStateAction<CommenterSettingType>
  >;
};

/** App context created */
const AppContext = createContext<AppContextType>({
  instagramAccounts: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInstagramAccounts: () => {},
  commenterSetting: { numberOfComment: 1, selectedAccounts: [] },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCommenterSetting: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [instagramAccounts, setInstagramAccounts] = useState<
    InstagramAccountDetailsType[]
  >([]);

  const [commenterSetting, setCommenterSetting] =
    useState<CommenterSettingType>({
      numberOfComment: 1,
      selectedAccounts: [],
    });

  const contextValues = {
    instagramAccounts,
    setInstagramAccounts,
    commenterSetting,
    setCommenterSetting,
  };

  /** react context provider */
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = (): AppContextType =>
  useContext<AppContextType>(AppContext);

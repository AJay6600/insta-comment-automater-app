import { createContext, useContext, useMemo, useState } from "react";
import type { InstagramAccountDetailsType } from "../utils/types";

type AppContextType = {
  instagramAccounts: InstagramAccountDetailsType[];
  setInstagramAccounts: React.Dispatch<
    React.SetStateAction<InstagramAccountDetailsType[]>
  >;
};

/** App context created */
const AppContext = createContext<AppContextType>({
  instagramAccounts: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setInstagramAccounts: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [instagramAccounts, setInstagramAccounts] = useState<
    InstagramAccountDetailsType[]
  >([]);

  const contextValues = useMemo(
    () => ({ instagramAccounts, setInstagramAccounts }),
    [instagramAccounts]
  );

  /** react context provider */
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppData = (): AppContextType =>
  useContext<AppContextType>(AppContext);

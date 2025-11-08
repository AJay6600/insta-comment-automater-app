import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/helpers/apiRequest";
import type { GetAllAccountsResponseType } from "../utils/types";

export const useGetAllAccounts = () => {
  return useQuery({
    queryKey: ["Accounts"],
    queryFn: () =>
      apiRequest<GetAllAccountsResponseType>({
        method: "get",
        url: "/api/accounts",
      }),
  });
};

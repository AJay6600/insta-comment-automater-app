import { useMutation } from "@tanstack/react-query";
import apiRequest from "../utils/helpers/apiRequest";

type DeleteAccountResponseType = {
  message: string;
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: ({ accountId }: { accountId: string }) =>
      apiRequest<DeleteAccountResponseType>({
        method: "delete",
        url: `/api/accounts/${accountId}`,
      }),
  });
};

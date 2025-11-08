import { useMutation } from "@tanstack/react-query";
import apiRequest from "../utils/helpers/apiRequest";
import type { AddAccountPayload, AddAccountResponseType } from "../utils/types";

export const useAddAccount = () => {
  return useMutation({
    mutationFn: (payload: AddAccountPayload) =>
      apiRequest<AddAccountResponseType>({
        method: "post",
        url: "/api/accounts/addAccount",
        body: payload,
      }),
  });
};

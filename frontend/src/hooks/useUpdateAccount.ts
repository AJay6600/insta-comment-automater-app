import { useMutation } from "@tanstack/react-query";
import type {
  UpdateAccountRequestBodyType,
  UpdateAccountResponseType,
} from "../utils/types";
import apiRequest from "../utils/helpers/apiRequest";

type UpdateAccountPropsType = {
  accountId: string;
  payload: UpdateAccountRequestBodyType;
};

export const useUpdateAccount = () => {
  return useMutation({
    mutationFn: ({ payload, accountId }: UpdateAccountPropsType) =>
      apiRequest<UpdateAccountResponseType>({
        method: "put",
        url: `/api/accounts/${accountId}`,
        body: payload,
      }),
  });
};

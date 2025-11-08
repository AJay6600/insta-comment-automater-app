import { App, Button, Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { Input } from "../components/input/Input";
import { FormItem } from "../components/form-item/FormItem";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AddAccountPayload, AddAccountResponseType } from "../utils/types";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useAppData } from "../context/AppContext";

type AddInstagramAccountFormType = {
  userName: string;
  password: string;
};

type AddInstagramAccountFormPropsType = {
  onAddAccount: UseMutateAsyncFunction<
    AddAccountResponseType,
    Error,
    AddAccountPayload,
    unknown
  >;
  isLoading: boolean;
};

const validationSchema = yup.object({
  userName: yup.string().required("User name is required"),
  password: yup.string().required("Password is required"),
});

const AddInstagramAccountForm = ({
  onAddAccount,
  isLoading,
}: AddInstagramAccountFormPropsType) => {
  const { message } = App.useApp();

  const { setInstagramAccounts } = useAppData();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddInstagramAccountFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: { userName: "", password: "" },
    mode: "onChange",
  });

  /** Function which called on submission of form */
  const onSubmit = async (formData: AddInstagramAccountFormType) => {
    try {
      const response = await onAddAccount({
        userName: formData.userName,
        password: formData.password,
      });

      console.log("response", response);
      if (response.message && response.account) {
        setInstagramAccounts((prev) => [
          ...prev,
          {
            id: response.account.id,
            userName: response.account.userName,
            isActive: response.account.isActive,
          },
        ]);
        message.success(response.message);
        reset();
      }
    } catch (error) {
      const err = error as AxiosError;
      message.error(err.message);
      console.log("err", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* user name */}
        <Col span={24}>
          <FormItem
            label="User Name"
            errorText={errors && errors.userName && errors.userName.message}
          >
            <Input
              name="userName"
              placeholder="Enter user name"
              rhfControllerProps={{ control }}
              hasError={!!(errors && errors.userName)}
            />
          </FormItem>
        </Col>

        {/* password */}
        <Col span={24}>
          <FormItem
            label="User Name"
            errorText={errors && errors.password && errors.password.message}
          >
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              rhfControllerProps={{ control }}
              hasError={!!(errors && errors.password)}
            />
          </FormItem>
        </Col>

        {/* Submit Button  */}
        <Col span={24} className="mt-7">
          <Button
            loading={isLoading}
            htmlType="submit"
            icon={<MdAdd size={20} />}
            className=" w-full p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
          >
            Add instagram Account
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddInstagramAccountForm;

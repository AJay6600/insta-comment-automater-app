import { Button, Col, Row } from "antd";
import { useForm } from "react-hook-form";
import { Input } from "../components/input/Input";
import { FormItem } from "../components/form-item/FormItem";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InstagramAccountDetailsType } from "../utils/types";

type AddInstagramAccountFormType = {
  userName: string;
  password: string;
};

type AddInstagramAccountFormPropsType = {
  onAddAccount: (accountDetails: InstagramAccountDetailsType) => void;
};

const validationSchema = yup.object({
  userName: yup.string().required("User name is required"),
  password: yup.string().required("Password is required"),
});

const AddInstagramAccountForm = ({
  onAddAccount,
}: AddInstagramAccountFormPropsType) => {
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
  const onSubmit = (formData: AddInstagramAccountFormType) => {
    onAddAccount({ ...formData, isActive: true });
    reset();
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

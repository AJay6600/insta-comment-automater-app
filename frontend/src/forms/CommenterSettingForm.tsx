import { Button, Col, Row } from "antd";
import { useForm, type Resolver } from "react-hook-form";
import { FormItem } from "../components/form-item/FormItem";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputNumber } from "../components/input-number/InputNumber";
import { useAppData } from "../context/AppContext";
import { Select } from "../components/select/Select";
import type { InstagramAccountDetailsType } from "../utils/types";
import { useEffect } from "react";

type CommenterSettingFormType = {
  numberOfComment: number;
  selectedAccounts: string[];
};

const validationSchema = yup.object({
  numberOfComment: yup.number().required("This field is required"),
});

const CommenterSettingForm = () => {
  const { commenterSetting, instagramAccounts, setCommenterSetting } =
    useAppData();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CommenterSettingFormType>({
    resolver: yupResolver(
      validationSchema
    ) as unknown as Resolver<CommenterSettingFormType>,
    defaultValues: {
      numberOfComment: commenterSetting.numberOfComment,
      selectedAccounts: commenterSetting.selectedAccounts.map(
        (accounts) => accounts.userName
      ),
    },
    mode: "onChange",
  });

  // ✅ Reinitialize form whenever commenterSetting changes
  useEffect(() => {
    reset({
      numberOfComment: commenterSetting.numberOfComment,
      selectedAccounts: commenterSetting.selectedAccounts.map(
        (acc) => acc.userName
      ),
    });
  }, [commenterSetting, reset]);

  /** Function which called on submission of form */
  const onSubmit = (formData: CommenterSettingFormType) => {
    const updatedCommenterSetting = {
      numberOfComment: formData.numberOfComment,
      selectedAccounts: formData.selectedAccounts.map((accountUsername) => {
        const accountDetails = instagramAccounts.find(
          (account) => account.userName === accountUsername
        );

        return accountDetails as InstagramAccountDetailsType;
      }),
    };

    setCommenterSetting(updatedCommenterSetting);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* Number of Comment */}
        <Col span={24}>
          <FormItem
            label="Number of comment per account"
            errorText={
              errors && errors.numberOfComment && errors.numberOfComment.message
            }
          >
            <InputNumber
              name="numberOfComment"
              placeholder="enter number"
              rhfControllerProps={{ control }}
              defaultValue={commenterSetting.numberOfComment}
              hasError={!!(errors && errors.numberOfComment)}
            />
          </FormItem>
        </Col>

        {/* Account selection */}
        <Col span={24}>
          <FormItem
            label="Select accounts to comment"
            errorText={
              errors &&
              errors.selectedAccounts &&
              errors.selectedAccounts.message
            }
          >
            <Select
              mode="multiple"
              name="selectedAccounts"
              placeholder="Select accounts"
              rhfControllerProps={{ control }}
              options={instagramAccounts.map((account) => ({
                label: account.userName,
                value: account.userName,
              }))}
              antdSelectProps={{
                showSearch: true,
                filterOption: (input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase()),
                filterSort: (optionA, optionB) =>
                  ((optionA?.label ?? "") as string)
                    .toLowerCase()
                    .localeCompare(
                      ((optionB?.label ?? "") as string).toLowerCase()
                    ),
              }}
            />
          </FormItem>
        </Col>

        {/* Submit Button  */}
        <Col span={24} className="mt-7">
          <Button
            htmlType="submit"
            className=" w-full p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
          >
            Save settings
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default CommenterSettingForm;

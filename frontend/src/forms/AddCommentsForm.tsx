import { Alert, Button, Col, Row, Typography } from "antd";
import { useForm } from "react-hook-form";
import { FormItem } from "../components/form-item/FormItem";
import { Input } from "../components/input/Input";
import { MdAdd } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";
import { assignCommentsToAccounts } from "../utils/helpers/assignCommentsToAccounts";
import { useAppData } from "../context/AppContext";

type AddCommentsFormPropsType = {
  onAddComments: React.Dispatch<
    React.SetStateAction<CommentsPerSelectedAccountsDataType[]>
  >;
};

type AddCommentsFormType = {
  comments: string;
};

const validationSchema = yup.object({
  comments: yup.string().required("Comments is required"),
});

const { Text } = Typography;

const AddCommentsForm = ({ onAddComments }: AddCommentsFormPropsType) => {
  const { commenterSetting } = useAppData();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentsFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: { comments: "" },
    mode: "onChange",
  });

  const onSubmit = (formData: AddCommentsFormType) => {
    const comments = formData.comments.split(",");

    onAddComments(
      assignCommentsToAccounts(
        comments,
        commenterSetting.selectedAccounts,
        commenterSetting.numberOfComment
      )
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[0, 28]}>
        <Col span={24}>
          <FormItem
            label="Comments"
            errorText={errors && errors.comments && errors.comments.message}
          >
            <Input
              type="textArea"
              name="comments"
              placeholder="Enter comma separated comments"
              rhfControllerProps={{ control }}
              hasError={!!(errors && errors.comments)}
            />
          </FormItem>
        </Col>

        <Col span={24}>
          <Button
            disabled={!!(commenterSetting.selectedAccounts.length === 0)}
            icon={<MdAdd size={20} />}
            htmlType="submit"
            className=" w-full p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
          >
            Add comments
          </Button>
        </Col>

        {commenterSetting.selectedAccounts.length === 0 && (
          <Col span={24}>
            {" "}
            <Alert
              message={
                <Text className="text-base text-white font-medium">
                  No Account is Selected for commenting
                </Text>
              }
              description={
                <Text className="text-sm text-white">
                  Go to commenter setting and add accounts from available
                  accounts
                </Text>
              }
              type="info"
              showIcon
              className="bg-primary-100/25 p-2"
            />
          </Col>
        )}
      </Row>
    </form>
  );
};

export default AddCommentsForm;

import { Alert, Button, Col, Row, Typography } from "antd";
import { useForm } from "react-hook-form";
import { FormItem } from "../components/form-item/FormItem";
import { Input } from "../components/input/Input";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";
import { useAppData } from "../context/AppContext";
import { useState } from "react";
import { assignCommentsToAccounts } from "../utils/helpers/assignCommentsToAccounts";

type PostCommentFormPropsType = {
  commentsPerSelectedAccount: CommentsPerSelectedAccountsDataType[];
  setCommentsPerSelectedAccount: React.Dispatch<
    React.SetStateAction<CommentsPerSelectedAccountsDataType[]>
  >;
};

type PostCommentFormType = {
  postLink: string;
};

const { Text } = Typography;

const PostCommentForm = ({
  commentsPerSelectedAccount,
  setCommentsPerSelectedAccount,
}: PostCommentFormPropsType) => {
  const { commenterSetting } = useAppData();

  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    watch,
    setError,
  } = useForm<PostCommentFormType>({ mode: "onChange" });

  const handleAssignComments = () => {
    const postLinkValue = watch("postLink");

    const postLink = postLinkValue ? postLinkValue.trim() : null;

    if (!postLink) {
      setError("postLink", { message: "Post link is required" });
      return;
    }

    setButtonLoading(true);

    // simulate async process
    setTimeout(() => {
      const comments = [
        "Wow this looks amazing 😍",
        "Absolutely love the vibe ✨",
        "You never miss with your content 🔥",
        "This picture just made my day 💫",
        "Pure perfection 💯",
        "Keep shining and inspiring 💪💖",
        "Always bringing positive energy 🌞",
        "You’re leveling up every time 🚀",
        "Such a great shot 🎯",
        "Love this creativity 👏",
        "The colors are stunning 🎨",
        "Can’t stop looking at this 😍",
        "So aesthetic and clean ✨",
        "This deserves more likes 🔥",
        "You’re literally glowing 🌟",
        "Love the mood of this pic 💕",
        "Every detail is perfect 😍",
        "This belongs in a magazine 📸",
        "Totally obsessed with this look 😍",
        "Keep up the amazing work 🙌",
      ];

      const assignedComments = assignCommentsToAccounts(
        comments,
        commenterSetting.selectedAccounts,
        commenterSetting.numberOfComment
      );

      setCommentsPerSelectedAccount(assignedComments);
      console.log("setting the comment");
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <form>
      <Row>
        {/* link input */}
        <Col span={24}>
          <FormItem
            label="Post Link"
            errorText={errors && errors.postLink && errors.postLink.message}
          >
            <Input
              name="postLink"
              placeholder="Enter post link"
              rhfControllerProps={{ control }}
              hasError={!!(errors && errors.postLink)}
            />
          </FormItem>
        </Col>

        {/* Generate comment button */}
        <Col span={24} className="mt-7">
          <Button
            loading={buttonLoading}
            disabled={commenterSetting.selectedAccounts.length === 0}
            onClick={handleAssignComments}
            className=" w-full p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
          >
            Generate comment for post
          </Button>
        </Col>

        {/* Post button */}
        <Col span={24} className="mt-7">
          <Button
            disabled={
              commenterSetting.selectedAccounts.length === 0 ||
              !!commentsPerSelectedAccount
            }
            htmlType="submit"
            className=" w-full p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
          >
            Post Comment
          </Button>
        </Col>

        {commenterSetting.selectedAccounts.length === 0 && (
          <Col span={24} className="mt-8">
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
        {/* {commentsPerSelectedAccount &&
          commentsPerSelectedAccount[0].comments[0]} */}
      </Row>
    </form>
  );
};

export default PostCommentForm;

import { Card, Col, Row, Typography } from "antd";
import { IoIosSend } from "react-icons/io";
import PostCommentForm from "../forms/PostCommentForm";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";

const { Text } = Typography;

type PostCommentSectionPropsType = {
  commentsPerSelectedAccount: CommentsPerSelectedAccountsDataType[];
  setCommentsPerSelectedAccount: React.Dispatch<
    React.SetStateAction<CommentsPerSelectedAccountsDataType[]>
  >;
};

const PostCommentSection = ({
  commentsPerSelectedAccount,
  setCommentsPerSelectedAccount,
}: PostCommentSectionPropsType) => {
  return (
    <Card className="bg-secondary-400 border-secondary-100">
      <Row gutter={[0, 28]}>
        <Col span={24} className="flex align-middle gap-5">
          <IoIosSend
            size={28}
            color="var(--color-primary)"
            className="self-center"
          />
          <Text className="text-primary text-xl font-medium">
            Post Comments
          </Text>
        </Col>

        <Col span={24}>
          <Row gutter={[0, 28]}>
            <Col span={24}>
              <PostCommentForm
                commentsPerSelectedAccount={commentsPerSelectedAccount}
                setCommentsPerSelectedAccount={setCommentsPerSelectedAccount}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default PostCommentSection;

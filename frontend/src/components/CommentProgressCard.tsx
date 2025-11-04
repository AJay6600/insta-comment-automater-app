import { Avatar, Card, Col, List, Row, Typography } from "antd";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";

const { Text } = Typography;

type CommentsProgressCardPropsType = {
  commentDetails: CommentsPerSelectedAccountsDataType;
};

const CommentProgressCard = ({
  commentDetails,
}: CommentsProgressCardPropsType) => {
  return (
    <Card
      size="small"
      hoverable
      styles={{ body: { padding: "20px 5px" } }}
      className="h-full bg-secondary-400 border-secondary-100"
    >
      <Row justify="center" gutter={[0, 10]}>
        <Col span={24} className="flex justify-center">
          <Avatar
            size={44}
            className="bg-secondary border border-primary text-primary"
          >
            {commentDetails.userName.slice(0, 2)}
          </Avatar>
        </Col>

        <Col span={24} className="flex justify-center">
          <Text className="text-base text-white font-medium">
            {commentDetails.userName}
          </Text>
        </Col>

        {commentDetails.comments.length > 0 && (
          <Col
            span={24}
            className="border-t border-secondary-200 pt-2 px-3 truncate"
          >
            <List
              grid={{
                gutter: 16,
                xs: 1,
                md: 1,
                xl: 1,
              }}
              dataSource={commentDetails.comments}
              renderItem={(comment, index) => (
                <Text className="text-sm text-grey truncate">
                  {index + 1}. {comment}
                </Text>
              )}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default CommentProgressCard;

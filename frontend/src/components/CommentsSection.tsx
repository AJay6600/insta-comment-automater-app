import { Avatar, Card, Col, Row, Typography } from "antd";
import { FaCommentAlt } from "react-icons/fa";
import AddCommentsForm from "../forms/AddCommentsForm";
import React from "react";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";
import { FaRegCommentAlt } from "react-icons/fa";

const { Text } = Typography;

type CommentSectionPropsType = {
  commentsPerAccount: CommentsPerSelectedAccountsDataType[];
  onAddComments: React.Dispatch<
    React.SetStateAction<CommentsPerSelectedAccountsDataType[]>
  >;
};

const CommentsSection = ({
  commentsPerAccount,
  onAddComments,
}: CommentSectionPropsType) => {
  return (
    <Card className="bg-secondary-400 border-secondary-100">
      <Row gutter={[0, 28]}>
        <Col span={24} className="flex align-middle gap-5">
          <FaCommentAlt
            size={22}
            color="var(--color-primary)"
            className="self-center"
          />
          <Text className="text-primary text-xl font-medium">Comments</Text>
        </Col>

        <Col span={24}>
          <Row gutter={[0, 28]}>
            <Col span={24}>
              <AddCommentsForm onAddComments={onAddComments} />
            </Col>

            {commentsPerAccount.length > 0 && (
              <Col
                span={24}
                className="h-[250px] overflow-y-auto pr-2 custom-scrollbar"
              >
                <Row gutter={[0, 22]}>
                  {commentsPerAccount.map((account) => (
                    <Col span={24} className="bg-secondary-200 p-3 rounded-md">
                      <Row justify="space-between">
                        <Col
                          span={10}
                          className="flex flex-row gap-3 justify-start align-middle items-center"
                        >
                          <Avatar size={42} className="bg-primary-100">
                            {account.userName.slice(0, 2)}
                          </Avatar>

                          <Text className="text-white text-base font-normal">
                            {account.userName}
                          </Text>
                        </Col>

                        <Col
                          span={6}
                          className="flex justify-end items-center gap-3"
                        >
                          <FaRegCommentAlt
                            size={10}
                            color="var(--color-white)"
                          />
                          <Text className="text-white text-balance font-medium">
                            {account.comments.length}
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CommentsSection;

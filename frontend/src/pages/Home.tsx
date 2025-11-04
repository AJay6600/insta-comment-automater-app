import { Col, Row } from "antd";
import InforSection from "../components/InforSection";

import PostCommentSection from "../components/PostCommentSection";
import CommenterSettingSection from "../components/CommenterSettingSection";
import { useState } from "react";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";
import CommentProgressCard from "../components/CommentProgressCard";

const Home = () => {
  const [commentsPerSelectedAccounts, setCommentsPerSelectedAccounts] =
    useState<CommentsPerSelectedAccountsDataType[]>([]);
  return (
    <Row className="px-3 md:px-6 py-6 md:py-11" gutter={[0, 30]}>
      <Col span={24}>
        <InforSection />
      </Col>

      <Col span={24} className="h-full">
        <Row
          justify={{ xs: "center", md: "center", lg: "space-between" }}
          gutter={[0, 29]}
        >
          <Col span={22} md={20} lg={11}>
            <PostCommentSection
              setCommentsPerSelectedAccount={setCommentsPerSelectedAccounts}
              commentsPerSelectedAccount={commentsPerSelectedAccounts}
            />
          </Col>

          <Col span={22} md={20} lg={11} className="hidden md:block">
            <CommenterSettingSection />
          </Col>
        </Row>
      </Col>

      {commentsPerSelectedAccounts.length > 0 && (
        <Col className="border border-secondary-200 rounded-md p-4" span={24}>
          <Row justify="center" align="middle" gutter={[28, 16]}>
            {commentsPerSelectedAccounts.map((account) => (
              <Col md={12} lg={8}>
                <CommentProgressCard commentDetails={account} />
              </Col>
            ))}
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default Home;

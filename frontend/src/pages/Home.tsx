import { Col, Row } from "antd";
import InforSection from "../components/InforSection";
import CommentsSection from "../components/CommentsSection";
import { useState } from "react";
import type { CommentsPerSelectedAccountsDataType } from "../utils/types";

const Home = () => {
  const [CommentPerSelectedAccount, setCommentPerSelectAccount] = useState<
    CommentsPerSelectedAccountsDataType[]
  >([]);

  return (
    <Row className="h-[90vh] px-6 py-11" gutter={[0, 50]}>
      <Col span={24}>
        <InforSection />
      </Col>

      <Col span={24} className="h-[85%]">
        <Row className="h-full">
          <Col span={10}>
            <CommentsSection
              commentsPerAccount={CommentPerSelectedAccount}
              onAddComments={setCommentPerSelectAccount}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Home;

import { Card, Col, Row, Typography } from "antd";
import { IoMdSettings } from "react-icons/io";
import CommenterSettingForm from "../forms/CommenterSettingForm";

const { Text } = Typography;

const CommenterSettingSection = () => {
  return (
    <Card className="bg-secondary-400 border-secondary-100">
      <Row gutter={[0, 28]}>
        <Col span={24} className="flex align-middle gap-5">
          <IoMdSettings
            size={28}
            color="var(--color-primary)"
            className="self-center"
          />
          <Text className="text-primary text-xl font-medium">
            Commenter settings
          </Text>
        </Col>

        <Col span={24}>
          <Row gutter={[0, 28]}>
            <Col span={24}>
              <CommenterSettingForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default CommenterSettingSection;

import { Avatar, Button, Card, Col, Row, Switch, Typography } from "antd";
import { MdDelete } from "react-icons/md";
import type {
  HandleIsActivePropsType,
  InstagramAccountDetailsType,
} from "../utils/types";

type AccountProfileCardPropsType = {
  accountDetails: InstagramAccountDetailsType;
  isLoading: boolean;
  onAccountDelete: (accountId: string) => Promise<void>;
  onIsActive: ({
    accountId,
    isActive,
  }: HandleIsActivePropsType) => Promise<void>;
};

const { Text } = Typography;

const AccountProfileCard = ({
  accountDetails,
  isLoading,
  onIsActive,
  onAccountDelete,
}: AccountProfileCardPropsType) => {
  return (
    <Card
      hoverable
      size="small"
      className="w-full h-full bg-secondary-400 border-none hover:!border-secondary-100 rounded-2xl py-8 transition-transform duration-300 hover:scale-[1.03] group"
    >
      <Row className="right-2 top-2 absolute hidden group-hover:block">
        {/* Delete button */}
        <Button
          icon={<MdDelete size={18} />}
          type="primary"
          ghost
          shape="circle"
          onClick={() => {
            onAccountDelete(accountDetails.id);
          }}
        />
      </Row>
      <Row justify="center" align="middle" gutter={[0, 22]}>
        <Col span={24} className="flex justify-center">
          {/* Avatar */}
          <Avatar
            size={70}
            className="text-2xl font-medium bg-secondary border border-primary text-primary"
          >
            {accountDetails.userName.slice(0, 2)}
          </Avatar>
        </Col>

        {/* User name */}
        <Col span={24} className="flex justify-center">
          <Text className="text-xl font-semibold text-white">
            {accountDetails.userName}
          </Text>
        </Col>

        {/* is active switch */}
        <Col span={24} className="flex justify-center">
          <Switch
            loading={isLoading}
            checkedChildren="Commenter"
            unCheckedChildren="Not Commenter"
            defaultValue={accountDetails.isActive}
            className="text-white font-medium w-[60%]"
            onChange={(isActive) => {
              onIsActive({ accountId: accountDetails.id, isActive: isActive });
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default AccountProfileCard;

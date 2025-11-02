import { Avatar, Badge, Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Modal from "../components/Modal";
import AddInstagramAccountForm from "../forms/AddInstagramAccountForm";
import type { InstagramAccountDetailsType } from "../utils/types";
import InstagramAccounts from "../components/InstagramAccounts";
import { useAppData } from "../context/AppContext";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import CommenterSettingForm from "../forms/CommenterSettingForm";
import { FaUserCheck } from "react-icons/fa6";

const { Text } = Typography;

const Home = () => {
  const { instagramAccounts, setInstagramAccounts, commenterSetting } =
    useAppData();

  const [openAddAccountModal, setOpenAddAccountModal] =
    useState<boolean>(false);

  const [openCommenterSetupModal, setOpenCommenterSetupModal] =
    useState<boolean>(false);

  const handleAddInstagramAccount = (
    accountDetails: InstagramAccountDetailsType
  ) => {
    setInstagramAccounts((prev) => [...prev, accountDetails]);
    setOpenAddAccountModal(false);
  };

  const selectedAccountCount =
    instagramAccounts.length === commenterSetting.selectedAccounts.length
      ? "All"
      : `${commenterSetting.selectedAccounts.length}/${instagramAccounts.length}`;

  return (
    <div>
      <Row className="px-6 py-11">
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Row gutter={[32, 0]}>
                {/* Number of account select badge */}
                <Col>
                  <Badge
                    count={selectedAccountCount}
                    styles={{
                      indicator: {
                        backgroundColor: "var(--color-primary)",
                      },
                    }}
                  >
                    <Avatar
                      shape="square"
                      size="large"
                      className="bg-gradient-primary"
                      icon={<FaUserCheck />}
                    />
                  </Badge>
                </Col>

                {/* number of comment */}
                <Col>
                  <div className="flex flex-col justify-center align-middle bg-primary-100 p-2 rounded-md">
                    <Text className="text-white text-base">
                      Number of comment : {commenterSetting.numberOfComment}
                    </Text>
                  </div>
                </Col>

                {instagramAccounts.length > 0 && (
                  <Col>
                    <InstagramAccounts />
                  </Col>
                )}
              </Row>
            </Col>

            <Col span={12} className="flex justify-end">
              <Row gutter={[16, 0]}>
                {/* setup commenter */}
                <Col>
                  <Button
                    icon={<IoSettingsOutline size={20} />}
                    onClick={() => {
                      setOpenCommenterSetupModal(true);
                    }}
                    className="p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
                  >
                    Commenter Settings
                  </Button>
                </Col>

                {/* Add account button */}
                <Col>
                  <Button
                    icon={<MdAdd size={20} />}
                    onClick={() => {
                      setOpenAddAccountModal(true);
                    }}
                    className="p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
                  >
                    Add instagram Account
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Add account form modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <FaUser size={20} color="var(--color-white)" />
            <Text className="text-white text-lg">Add Instagram Account</Text>
          </div>
        }
        isOpen={openAddAccountModal}
        onClose={setOpenAddAccountModal}
      >
        <AddInstagramAccountForm onAddAccount={handleAddInstagramAccount} />
      </Modal>

      {/* Setup commenter modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <IoSettingsSharp size={20} color="var(--color-white)" />
            <Text className="text-white text-lg">Setup Commenter</Text>
          </div>
        }
        isOpen={openCommenterSetupModal}
        onClose={setOpenCommenterSetupModal}
      >
        <CommenterSettingForm closeForm={setOpenCommenterSetupModal} />
      </Modal>
    </div>
  );
};

export default Home;

import { Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Modal from "../components/Modal";
import AddInstagramAccountForm from "../forms/AddInstagramAccountForm";
import type { InstagramAccountDetailsType } from "../utils/types";
import InstagramAccounts from "../components/InstagramAccounts";

const { Text } = Typography;

const Home = () => {
  const [openAddAccountModal, setOpenAddAccountModal] =
    useState<boolean>(false);

  const [instaAccounts, setInstaAccounts] = useState<
    InstagramAccountDetailsType[]
  >([]);

  const handleAddInstagramAccount = (
    accountDetails: InstagramAccountDetailsType
  ) => {
    console.log("Account details:", accountDetails);
    setInstaAccounts((prev) => [...prev, accountDetails]);
    setOpenAddAccountModal(false);
  };

  return (
    <div>
      <Row className="px-6 py-11">
        <Col span={24} className="flex justify-end">
          <Row gutter={[16, 0]}>
            {instaAccounts.length > 0 && (
              <Col>
                <InstagramAccounts accountsDetails={instaAccounts} />
              </Col>
            )}

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
    </div>
  );
};

export default Home;

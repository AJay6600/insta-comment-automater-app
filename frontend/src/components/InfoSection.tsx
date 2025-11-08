import { Button, Col, Row, Typography } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import InstagramAccounts from "./InstagramAccounts";
import { MdAdd } from "react-icons/md";
import { useAppData } from "../context/AppContext";
import AddInstagramAccountForm from "../forms/AddInstagramAccountForm";
import Modal from "./Modal";
import type { AddAccountPayload, AddAccountResponseType } from "../utils/types";
import { IoMdSettings } from "react-icons/io";
import CommenterSettingForm from "../forms/CommenterSettingForm";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";

type InfoSectionPropsType = {
  onAddAccount: UseMutateAsyncFunction<
    AddAccountResponseType,
    Error,
    AddAccountPayload,
    unknown
  >;
  isLoading: boolean;
};

const { Text } = Typography;

const InfoSection = ({ onAddAccount, isLoading }: InfoSectionPropsType) => {
  const { instagramAccounts } = useAppData();

  const [openAddAccountModal, setOpenAddAccountModal] =
    useState<boolean>(false);

  const [openCommenterSetting, setOpenCommenterSetting] =
    useState<boolean>(false);

  return (
    <div>
      <Row justify={{ sm: "space-between", md: "end" }} gutter={[0, 12]}>
        <Col
          span={24}
          lg={12}
          className="w-full flex justify-between md:justify-end"
        >
          <Row
            gutter={[{ md: 16 }, 0]}
            className="w-full flex justify-between lg:justify-end"
          >
            {instagramAccounts.length > 0 && (
              <Col>
                <InstagramAccounts />
              </Col>
            )}

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

        {/* comment setting button */}
        <Col span={24} className="flex justify-end md:hidden">
          <Button
            icon={<IoMdSettings size={20} />}
            onClick={() => {
              setOpenCommenterSetting(true);
            }}
            className="p-5 bg-gradient-primary hover:!bg-gradient-primary hover:!text-white hover:shadow-glow hover:shadow-md border-none text-white text-base font-medium"
          >
            Commenter setting
          </Button>
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
        <AddInstagramAccountForm
          onAddAccount={onAddAccount}
          isLoading={isLoading}
        />
      </Modal>

      <Modal
        title={
          <div className="flex items-center gap-3">
            <IoMdSettings size={20} color="var(--color-white)" />
            <Text className="text-white text-lg">Commenter setting</Text>
          </div>
        }
        isOpen={openCommenterSetting}
        onClose={setOpenCommenterSetting}
      >
        <CommenterSettingForm />
      </Modal>
    </div>
  );
};

export default InfoSection;

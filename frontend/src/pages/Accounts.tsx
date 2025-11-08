import { App, Col, Row, Typography } from "antd";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import type { HandleIsActivePropsType } from "../utils/types";
import type { AxiosError } from "axios";
import { useAppData } from "../context/AppContext";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import AccountProfileCard from "../components/AccountProfileCard";
import empty from "../assets/empty.json";
import Lottie from "lottie-react";

const { Text } = Typography;

const Accounts = () => {
  const { message } = App.useApp();

  const { setInstagramAccounts, instagramAccounts } = useAppData();

  /** This hooke will update the account details */
  const { mutateAsync: updateAccount, isPending: updateAccountLoading } =
    useUpdateAccount();

  /** This hook will delete the account */
  const { mutateAsync: deleteAccount } = useDeleteAccount();

  /** This function will handle the activation of the Account as commenter */
  const handleIsActive = async ({
    accountId,
    isActive,
  }: HandleIsActivePropsType) => {
    try {
      const response = await updateAccount({
        accountId,
        payload: { isActive },
      });

      if (
        response &&
        response.account &&
        Array.isArray(response.account) &&
        response.account.length > 0
      ) {
        setInstagramAccounts((previousAccounts) =>
          previousAccounts.map((account) =>
            account.id === accountId
              ? { ...account, isActive: isActive }
              : account
          )
        );

        message.success(response.message);
      }
    } catch (error) {
      const err = error as AxiosError;
      message.error(err.message);
    }
  };

  /** This function will handle the deletion of the account account */
  const handleDeleteInstagramAccount = async (accountId: string) => {
    try {
      const response = await deleteAccount({ accountId });

      setInstagramAccounts((previousAccounts) => {
        return previousAccounts.filter((accout) => accout.id !== accountId);
      });
      message.success(response.message);
    } catch (error) {
      const err = error as AxiosError;
      message.error(err.message);
    }
  };

  return (
    <Row justify="center" align="middle" className="h-full" gutter={[32, 22]}>
      {instagramAccounts &&
      Array.isArray(instagramAccounts) &&
      instagramAccounts.length > 0 ? (
        instagramAccounts.map((account) => (
          <Col xs={20} md={10} lg={8} xl={6}>
            <AccountProfileCard
              accountDetails={account}
              isLoading={updateAccountLoading}
              onIsActive={handleIsActive}
              onAccountDelete={handleDeleteInstagramAccount}
            />
          </Col>
        ))
      ) : (
        <Col
          span={24}
          className="flex flex-col justify-center align-middle items-center"
        >
          <Lottie
            animationData={empty}
            loop={true}
            style={{ width: 300, height: 400 }}
          />
          <Text className="text-lg font-semibold text-white">
            No Accounts Yet
          </Text>
        </Col>
      )}
    </Row>
  );
};

export default Accounts;

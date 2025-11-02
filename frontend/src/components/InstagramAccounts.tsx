import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import type { InstagramAccountDetailsType } from "../utils/types";
import { FaUsers } from "react-icons/fa";

type InstagramAccountsPropsType = {
  accountsDetails: InstagramAccountDetailsType[];
};

const InstagramAccounts = ({ accountsDetails }: InstagramAccountsPropsType) => {
  const navigate = useNavigate();

  const visibleAccounts = accountsDetails.slice(0, 3);

  const remainingCount = accountsDetails.length - visibleAccounts.length;

  const handleCountClick = () => {
    navigate("/instagram-accounts"); // 👈 Change this to your route
  };

  return (
    <Avatar.Group>
      {visibleAccounts.map((user, index) => (
        <Avatar
          size={40}
          key={index}
          alt={user.userName}
          className="bg-gradient-primary text-white cursor-pointer"
        >
          {user.userName.slice(0, 2)}
        </Avatar>
      ))}

      <Avatar
        size={40}
        className="bg-gradient-primary text-white cursor-pointer"
        onClick={handleCountClick}
      >
        {remainingCount ? <>+ {remainingCount}</> : <FaUsers />}
      </Avatar>
    </Avatar.Group>
  );
};

export default InstagramAccounts;

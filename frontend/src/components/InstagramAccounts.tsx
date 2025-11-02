import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { useAppData } from "../context/AppContext";

const InstagramAccounts = () => {
  const navigate = useNavigate();

  const { instagramAccounts } = useAppData();

  const visibleAccounts = instagramAccounts.slice(0, 3);

  const remainingCount = instagramAccounts.length - visibleAccounts.length;

  const handleCountClick = () => {
    navigate("/instagram-accounts");
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

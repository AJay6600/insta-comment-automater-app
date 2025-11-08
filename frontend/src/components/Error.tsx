import Lottie from "lottie-react";
import errorCat from "../assets/LoaderCat.json";
import { Typography } from "antd";

const { Text } = Typography;

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        animationData={errorCat}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
      <Text className="text-lg font-medium text-white">{error.message}</Text>
    </div>
  );
};

export default Error;

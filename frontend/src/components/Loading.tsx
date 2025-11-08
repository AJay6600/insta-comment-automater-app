import Lottie from "lottie-react";
import loading from "../assets/Loading.json";

const Loading = () => {
  return (
    <Lottie
      animationData={loading}
      loop={true}
      style={{ width: 150, height: 150 }}
    />
  );
};

export default Loading;

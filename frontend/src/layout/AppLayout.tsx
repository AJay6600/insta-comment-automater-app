import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FaInstagram } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-secondary-400 border-b border-secondary-100 items-start flex align-middle">
      <div className="self-center rounded-xl bg-gradient-primary p-2 shadow-lg ">
      <FaInstagram size={28}/>
      </div> 
      <h1 className="text-white p-2 self-center text-2xl">Commentor</h1>
      </Header>
      <Content className="h-full bg-secondary">{<Outlet />}</Content>
    </Layout>
  );
};

export default AppLayout;

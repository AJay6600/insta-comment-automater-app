import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FaInstagram } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Layout className="h-[100vh] flex flex-col overflow-y-hidden custom-scrollbar">
      {/* Fixed header */}
      <Header className="bg-secondary-400 border-b border-secondary-100 flex items-center px-4 py-2 z-10">
        <div className="rounded-xl bg-gradient-primary p-2 shadow-lg">
          <FaInstagram size={28} />
        </div>
        <h1 className="text-white ml-2 text-2xl font-semibold">Commentor</h1>
      </Header>

      {/* Scrollable content area */}
      <Content className="h-full overflow-y-auto bg-secondary p-4">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;

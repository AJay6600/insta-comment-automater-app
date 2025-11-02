import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-secondary-400 border-b border-secondary-100">
        Header
      </Header>
      <Content className="h-full bg-secondary">{<Outlet />}</Content>
    </Layout>
  );
};

export default AppLayout;

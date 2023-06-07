import React, { useContext, useState } from 'react';
import { Layout, theme } from 'antd';
import CSidebarMenu from '../../components/CSidebarMenu';
import { Outlet } from 'react-router-dom';
import logo from '../../resources/img/logo.jpg'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const { Header, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <HelmetProvider>
        <Layout>
          <Header className="header">
            <img src={logo} alt="" width={60} />
            {/* <Menu theme="dark" mode="horizontal" /> */}
          </Header>
          <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
              <CSidebarMenu />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Outlet />
            </Layout>
          </Layout>
        </Layout>
      </HelmetProvider>
    </>
  );
};

export const AppPageRoute = {
  path: '/app',
  element: <App />
}
export default App;
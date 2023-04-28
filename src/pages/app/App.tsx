import React from 'react';
import { Layout, theme } from 'antd';
import SidebarMenu from '../../components/SidebarMenu';
import { Outlet } from 'react-router-dom';
import logo from '../../resources/img/logo.jpg'

const { Header, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
        <img src={logo} alt="" width={60} />
        {/* <Menu theme="dark" mode="horizontal" /> */}
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <SidebarMenu />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export const AppPageRoute = {
  path: '/app',
  element: <App />
}
export default App;
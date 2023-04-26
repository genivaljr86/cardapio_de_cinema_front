import React from 'react';
import { Layout, Menu, theme } from 'antd';

import { Outlet } from 'react-router-dom';

const { Header, Sider } = Layout;


const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
          />
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
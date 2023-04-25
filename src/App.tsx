import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductsList from './pages/product/ProductList';
const { Header, Content, Sider } = Layout;


const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <p>Home Page</p>,
    },
    {
      path: '/products',
      element: <ProductsList />
    },
  ]);


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
          <Breadcrumb style={{ margin: '16px 0' }}
            items={[
              {
                title: 'Home'
              },
              {
                title: 'Produtos'
              },
              {
                title: 'Lista'
              },
            ]} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <RouterProvider router={router} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
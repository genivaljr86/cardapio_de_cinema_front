import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, Table, theme } from 'antd';
import axios from 'axios'
const { Header, Content, Sider } = Layout;

type ProductRow = {
  id: number;
  attributes: {
    Name: string;
    Price: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string
  }
}


const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [dataSource, setdataSource] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => {
        return `R$ ${value}`;
      }
    }
  ];

  useEffect(() => {
    axios.get(
      'http://localhost:1337/api/products',
      {
        headers: { Authorization: `Bearer 5e415dbea412d1b7d6739a9520f9ed2c8426b21ed08299fc5b9e1efdec49dd441b91ae2c8a4f1e3efdf513e39efaad4d9b8eca5cffe63094cd6bc86388e9f8ea0cc9f3091cc6bb6702a5c2c3802b9f452617347f755f6db9290161ec533dd72ab69adfeecc4c3cce8518e3640d4febd98418604b95f2c1ae091c5f374f6fec1d` }
      }
    )
      .then(response => {
        const { data: { data: dataResponse } } = response;
        const dataList = dataResponse.map((row: ProductRow) => {
          const { id, attributes: { Name: name, Price: price } } = row;
          return {
            key: id,
            name,
            price
          }
        });

        setdataSource(dataList)
      })
  }, [])


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
            <Table dataSource={dataSource} columns={columns} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
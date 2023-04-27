import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Layout, theme } from "antd";
import axios from "axios";

const { Content } = Layout;

type ClientRow = {
  id: number;
  attributes: {
    name: string;
    address: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string
  }
}


const ClientListPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [dataSource, setdataSource] = useState([]);
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'Endereço',
      dataIndex: 'address'
    }
  ];
  useEffect(() => {
    axios.get(
      'http://localhost:1337/api/clients',
      {
        headers: { Authorization: `Bearer 5e415dbea412d1b7d6739a9520f9ed2c8426b21ed08299fc5b9e1efdec49dd441b91ae2c8a4f1e3efdf513e39efaad4d9b8eca5cffe63094cd6bc86388e9f8ea0cc9f3091cc6bb6702a5c2c3802b9f452617347f755f6db9290161ec533dd72ab69adfeecc4c3cce8518e3640d4febd98418604b95f2c1ae091c5f374f6fec1d` }
      }
    )
      .then(response => {
        const { data: { data: dataResponse } } = response;
        const dataList = dataResponse.map((row: ClientRow) => {
          const { id, attributes: { name, address } } = row;
          return {
            key: id,
            name,
            address
          }
        });

        setdataSource(dataList)
      })
  }, [])
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}
        items={[
          {
            title: 'Home'
          },
          {
            title: 'Clientes'
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
    </>
  )
}

export const ClientListPageRoute = {
  index: true,
  element: <ClientListPage />
};

export default ClientListPage;
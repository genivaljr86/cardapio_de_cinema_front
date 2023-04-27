import React, { useEffect, useState } from "react";
import { Table, Layout, theme } from "antd";
import axios from "axios";
import CBreadcrumb from "../../components/CBreadBrumb";

const { Content } = Layout;

type ProductRow = {
  id: number;
  attributes: {
    name: string;
    price: number;
    createdAt: string;
    publishedAt: string;
    updatedAt: string
  }
}

const ProductsListPage: React.FC = () => {
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
      title: 'Preço',
      dataIndex: 'price',
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
          const { id, attributes: { name, price } } = row;
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
    <>
      <CBreadcrumb />
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

export const ProductListRoute = {
  index: true,
  element: <ProductsListPage />,
  handle: {
    label: 'Lista'
  }
};

export default ProductsListPage;
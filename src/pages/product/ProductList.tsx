import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

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

const ProductsList: React.FC = () => {
  const [dataSource, setdataSource] = useState([]);
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preço',
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
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default ProductsList;
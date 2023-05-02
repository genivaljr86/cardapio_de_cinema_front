import React, { useEffect, useState } from "react";
import { Table } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import { getProducts } from "../../services/product";


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
    const fetchData = async () => {
      try {
        const { data: { data: dataResponse } } = await getProducts();
        const dataList = dataResponse.map((row: ProductRow) => {
          const { id, attributes: { name, price } } = row;
          return {
            key: id,
            name,
            price
          }
        });
        setdataSource(dataList)

      } catch (err) {
        throw err;
      }
    }

    fetchData();

  }, [])
  return (
    <>
      <CTemplatePage>
        <Table dataSource={dataSource} columns={columns} />
      </CTemplatePage>
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
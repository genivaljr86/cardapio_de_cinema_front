import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { ClientResponseDataObject, getClients } from "../../services/client";
import { Link } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage";
import { UsergroupAddOutlined } from "@ant-design/icons";


const ClientListPage: React.FC = () => {
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
    async function fetchData() {
      try {
        const { data: { data: dataResponse } } = await getClients();
        const dataList = dataResponse.map((row: ClientResponseDataObject) => {
          const { id, attributes: { name, address } } = row;
          return {
            key: id,
            name: <Link to={`view/${id}`}>{name}</Link>,
            address
          }
        });

        setdataSource(dataList)
      } catch (err) {
        throw Error;
      }
    };

    fetchData();

  }, [])
  return (
    <>
      <CTemplatePage>
        <Table dataSource={dataSource} columns={columns} />
        {/* 
        @todo Review url link
        */}
        <Button href={'./clients/new'} icon={<UsergroupAddOutlined />} >Criar Cliente</Button>
      </CTemplatePage>
    </>
  )
}

export const ClientListPageRoute = {
  index: true,
  element: <ClientListPage />,
  handle: {
    label: 'Lista'
  }
};

export default ClientListPage;
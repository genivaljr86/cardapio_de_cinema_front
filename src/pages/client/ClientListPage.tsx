import React, { useEffect, useState } from "react";
import { Button, Modal, Skeleton, Table, notification } from "antd";
import { ClientResponseDataObject, deleteClient, getClients } from "../../services/client";
import { Link } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage";
import { ExclamationCircleFilled, UsergroupAddOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";


const ClientListPage: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns: ColumnsType<any> = [
    {
      title: 'Nome',
      dataIndex: 'name'
    },
    {
      title: 'Endereço',
      dataIndex: 'address'
    },
    {
      title: '',
      align: 'right',
      dataIndex: 'actions'
    }
  ];

  async function fetchData() {
    setLoading(true);
    try {
      const { data: { data: dataResponse } } = await getClients();
      const dataList = dataResponse.map((row: ClientResponseDataObject) => {
        const { id, attributes: { name, address } } = row;
        return {
          key: id,
          name: <Link to={`view/${id}`}>{name}</Link>,
          address,
          actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
        }
      });

      setDataSource(dataList)
    } catch (err) {
      throw Error;
    }
    setLoading(false);

  };

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Tem certeza que desejar apagar?',
      icon: <ExclamationCircleFilled />,
      content: 'Essa ação é irreversivel.',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
        return new Promise((resolve, reject) => {
          deleteClient(id!)
            .then(response => {
              notification.success({
                message: 'Sucesso!',
                description: 'Cliente apagado com sucesso'
              })
              fetchData();
              resolve(response);
            })
            .catch(err => {
              notification.error({
                message: 'Erro!',
                description: 'Não foi possivel criar agora, tente mais tarde'
              });
              reject();
            });
        })
      },
    });
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [])
  return (
    <>
      <CTemplatePage>
        {
          loading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <Table dataSource={dataSource} columns={columns} />
          )
        }
        {/* 
          @todo Review url link
        */}
        <Button type="primary" href={'./clients/new'} icon={<UsergroupAddOutlined />} >Criar Cliente</Button>
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
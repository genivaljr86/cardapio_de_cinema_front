import React, { useEffect, useState } from "react";
import { Button, Modal, Table, notification } from "antd";
import { ClientResponseDataObject, deleteClient, getClients } from "../../../services/client";
import { Link } from "react-router-dom";
import CTemplatePage from "../../../components/CTemplatePage";
import { ExclamationCircleFilled, UsergroupAddOutlined } from "@ant-design/icons";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { AxiosError } from "axios";
import useClientListHooks from "./hooks";

interface TableParams {
  pagination?: TablePaginationConfig;
}

const ClientListPage: React.FC = () => {
  const {
    pageSize,
    dataSource, setDataSource,
    loading, setLoading,
    error, setError
  } = useClientListHooks()

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize,
    },
  });

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
      const params = {
        'pagination[page]': tableParams.pagination?.current,
        'pagination[pageSize]': tableParams.pagination?.pageSize
      }
      const { data: { data: dataResponse, meta: { pagination } } } = await getClients(params);
      const dataList = dataResponse.map((row: ClientResponseDataObject) => {
        const { id, attributes: { name, address } } = row;
        return {
          key: id,
          name: <Link to={`view/${id}`}>{name}</Link>,
          address,
          actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
        }
      });

      setDataSource(dataList);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: pagination.total
        },
      });

    } catch (err) {
      setError(err as AxiosError)
    }
    setLoading(false);

  };

  const handleTableChange = (
    pagination: TablePaginationConfig
  ) => {
    setTableParams({ pagination })
  }

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
  }, [JSON.stringify(tableParams)])
  return (
    <>
      <CTemplatePage error={error}>
        <Table loading={loading}
          dataSource={dataSource}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          columns={columns} />
        <Link to={'./new'}>
          <Button type="primary" icon={<UsergroupAddOutlined />}>Criar Cliente</Button>
        </Link>
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
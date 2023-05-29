import React, { useEffect, useState } from "react";
import { Button, Modal, Table, TablePaginationConfig, notification } from "antd";
import { CoffeeOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { ColumnsType } from 'antd/lib/table'
import CTemplatePage from "../../../components/CTemplatePage";
import { ProductResponseDataObject, deleteProducts, getProducts } from "../../../services/product";
import { Link } from "react-router-dom";
import currencyFilter from "../../../utils/currencyFilter";
import Constants from "../../../constants";

interface TableParams {
  pagination?: TablePaginationConfig;
}

const ProductsListPage: React.FC = () => {
  const { PAGINATION: { PAGE_SIZE: pageSize } } = Constants;

  const [dataSource, setdataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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
      title: 'Preço',
      dataIndex: 'price',
      render: currencyFilter
    },
    {
      title: '',
      align: 'right',
      dataIndex: 'actions'
    }
  ];

  const fetchData = async () => {
    try {
      const params = {
        'pagination[page]': tableParams.pagination?.current,
        'pagination[pageSize]': tableParams.pagination?.pageSize
      }
      const { data: { data: dataResponse, meta: { pagination } } } = await getProducts(params);
      const dataList = dataResponse.map((row: ProductResponseDataObject) => {
        const { id, attributes: { name, price, } } = row;
        return {
          key: id,
          name: <Link to={`view/${id}`}>{name}</Link>,
          price,
          actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
        }
      });
      setdataSource(dataList);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: pagination.total
        },
      });

    } catch (err) {
      throw err;
    }

    setLoading(false);
  }
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
          deleteProducts(id!)
            .then(response => {
              notification.success({
                message: 'Sucesso!',
                description: 'Produto apagado com sucesso'
              })
              fetchData();
              resolve(response);
            })
            .catch(err => {
              notification.error({
                message: 'Erro!',
                description: 'Não foi possivel apagar agora, tente mais tarde'
              });
              reject(err);
            });
        })
      },
    });
  };


  useEffect(() => {
    setLoading(true);
    fetchData();
    // eslint-disable-next-line
  }, [JSON.stringify(tableParams)])
  return (
    <>
      <CTemplatePage>
        <Table
          loading={loading}
          dataSource={dataSource}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          columns={columns} />
        <Link to={`./new`}>
          <Button type="primary" icon={<CoffeeOutlined />}>Criar Produto</Button>
        </Link>
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
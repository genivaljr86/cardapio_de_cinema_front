import { useEffect, useState } from "react";
import CTemplatePage from "../../components/CTemplatePage"
import { ColumnsType } from "antd/lib/table";
import { OrderResponseDataObject, deleteOrders, getOrders } from "../../services/order";
import { Link } from "react-router-dom";
import currencyFilter from "../../utils/currencyFilter";
import { Button, Modal, Table, TablePaginationConfig, notification } from "antd";
import { DollarCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import dateTimeFilter from "../../utils/dateTimeFilter";
import Constants from "../../constants";
import { AxiosError } from "axios";

interface TableParams {
  pagination?: TablePaginationConfig;
}

const columns: ColumnsType<any> = [
  {
    title: 'ID',
    dataIndex: 'orderId'

  },
  {
    title: 'Cliente',
    dataIndex: 'name'
  },
  {
    title: 'Valor',
    dataIndex: 'amount_price'
  },
  {
    title: 'Data de Entrega',
    dataIndex: 'delivery_date'
  },
  {
    title: '',
    align: 'right',
    dataIndex: 'actions'
  }
]

const OrderListPage: React.FC = () => {
  const { pagination: { pageSize } } = Constants;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | undefined>(undefined)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize
    },
  });


  async function fetchData() {
    setLoading(true);
    try {
      const params = {
        'pagination[page]': tableParams.pagination?.current,
        'pagination[pageSize]': tableParams.pagination?.pageSize
      }
      const { data: { data: dataResponse, meta: { pagination } } } = await getOrders(params);
      const dataList = dataResponse.map((row: OrderResponseDataObject) => {
        const { id, attributes: { name, address, amount_price, delivery_date } } = row;
        return {
          key: id,
          orderId: <Link to={`view/${id}`}>{`#${id}`}</Link>,
          name,
          address,
          amount_price: currencyFilter(amount_price!),
          delivery_date: dateTimeFilter(delivery_date),
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
          deleteOrders(id!)
            .then(response => {
              notification.success({
                message: 'Sucesso!',
                description: 'Venda apagada com sucesso'
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
    fetchData();
    //eslint-disable-next-line
  }, [JSON.stringify(tableParams)])

  return (
    <CTemplatePage error={error}>
      <Table
        loading={loading}
        dataSource={dataSource}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        columns={columns} />
      <Link to={'./new'}>
        <Button type="primary" icon={<DollarCircleOutlined />} >Criar Venda</Button>
      </Link>
    </CTemplatePage>
  )
}
export const OrderListPageRoute = {
  index: true,
  element: <OrderListPage />,
  handle: {
    label: 'Lista'
  }
};

export default OrderListPage;
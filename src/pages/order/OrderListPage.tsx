import { useEffect, useState } from "react";
import CTemplatePage from "../../components/CTemplatePage"
import { ColumnsType } from "antd/lib/table";
import { OrderResponseDataObject, deleteOrders, getOrders } from "../../services/order";
import { Link } from "react-router-dom";
import currencyFilter from "../../utils/currencyFilter";
import { Button, Modal, Skeleton, Table, notification } from "antd";
import { DollarCircleOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import dateTimeFilter from "../../utils/dateTimeFilter";

const OrderListPage: React.FC = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

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

  async function fetchData() {
    setLoading(true);
    try {
      const { data: { data: dataResponse } } = await getOrders();
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
      setDataSource(dataList)
    } catch (err) {
      throw err;
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
  }, [])

  return (
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
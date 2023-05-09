import { useNavigate, useParams } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage"
import { useEffect, useState } from "react";
import { OrderResponseDataObject, getOrderByID } from "../../services/order";
import { Descriptions, Skeleton, Table } from "antd";
import currencyFilter from "../../utils/currencyFilter";
import { OrderDetailResponseDataObject, getOrderDetails } from "../../services/orderDetail";
import { ColumnsType } from "antd/es/table";
import dateTimeFilter from "../../utils/dateTimeFilter";


const columns: ColumnsType<any> = [
  {
    title: 'Produto',
    dataIndex: 'name'
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity',
    align: 'right'
  },
  {
    title: 'Preço',
    dataIndex: 'price',
    align: 'right'
  }
]

const OrderViewPage: React.FC = () => {

  const { id } = useParams();
  const [orderData, setOrderData] = useState<OrderResponseDataObject>();
  const [orderDetails, setOrderDetails] = useState<OrderDetailResponseDataObject[]>()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const { data: { data: orderDataResponse } } = await getOrderByID(id!, { 'populate[0]': 'client' });
        setOrderData(orderDataResponse);
        const { data: { data: orderDetailsDataResponse } } = await getOrderDetails({ 'filters[order_id]': id });
        setOrderDetails(orderDetailsDataResponse);
      } catch (err) {
        throw err;
      }
      setLoading(false)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <CTemplatePage>
      {
        loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        )
          :
          (
            <>
              <Descriptions title={'Dados de Entrega'}>
                <Descriptions.Item label={'Nome'}>{orderData?.attributes.name}</Descriptions.Item>
                <Descriptions.Item label={'Endereço de Entrega'}>{orderData?.attributes.address}</Descriptions.Item>
                <Descriptions.Item label={'Telefone'}>{orderData?.attributes.phone}</Descriptions.Item>
                <Descriptions.Item label={'Data de Entrega'}>{dateTimeFilter(orderData?.attributes.delivery_date!)}</Descriptions.Item>
                <Descriptions.Item label={'Valor Total'}>{currencyFilter(orderData?.attributes.amount_price!)}</Descriptions.Item>
              </Descriptions>
              <Descriptions title={'Produtos'}>
              </Descriptions>
              <Table
                showHeader={false}
                dataSource={
                  orderDetails?.map(({ attributes }, index) => ({
                    key: index,
                    name: attributes?.name,
                    quantity: attributes?.quantity,
                    price: currencyFilter(attributes?.price!)
                  }))
                }
                columns={columns}
              />
            </>
          )
      }
    </CTemplatePage>
  )
}

export const OrderViewPageRoute = {
  path: 'view/:id',
  element: <OrderViewPage />,
  handle: {
    label: 'Detalhes'
  }
};

export default OrderViewPage
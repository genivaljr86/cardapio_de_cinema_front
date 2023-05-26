import { Link } from "react-router-dom";
import CTemplatePage from "../../../components/CTemplatePage"
import { useEffect } from "react";
import { getOrderByID } from "../../../services/order";
import { Descriptions, Skeleton, Table } from "antd";
import currencyFilter from "../../../utils/currencyFilter";
import { getOrderDetails } from "../../../services/orderDetail";
import { ColumnsType } from "antd/es/table";
import dateTimeFilter from "../../../utils/dateTimeFilter";
import { AxiosError } from "axios";
import useOrderViewPageHooks from "./hooks";

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
  const {
    id,
    orderData, setOrderData,
    clientData, setClientData,
    orderDetails, setOrderDetails,
    loading, setLoading,
    error, setError
  } = useOrderViewPageHooks()

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const { data: { attributes: orderAttributes } } = await getOrderByID(id!, { 'populate[0]': 'client' })
        const { data: { id: clientID, attributes: { name: clientName } } } = orderAttributes.client;
        setOrderData(orderAttributes)
        setClientData({ id: clientID, name: clientName })
        const { data: { data: orderDetailsDataResponse } } = await getOrderDetails({ 'filters[order_id]': id });
        setOrderDetails(orderDetailsDataResponse);
      } catch (err) {
        setError(err as AxiosError)
      }
      setLoading(false)
    }
    fetchData();
    // eslint-disable-next-line
  }, [])

  return (
    <CTemplatePage error={error}>
      {
        loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            {/* @todo: Adicionar dados do Cliente original */}
            <Descriptions title={'Dados de Entrega'}>
              <Descriptions.Item label={'Cliente'}>
                <Link to={`../../clients/view/${clientData?.id}`}>
                  {clientData?.name}
                </Link>
              </Descriptions.Item>
              {
                orderData?.custom_delivery && (
                  <Descriptions.Item label={'Destinatário'}>{orderData?.name}</Descriptions.Item>
                )
              }
              <Descriptions.Item label={'Endereço de Entrega'}>{orderData?.address}</Descriptions.Item>
              <Descriptions.Item label={'Telefone'}>{orderData?.phone}</Descriptions.Item>
              <Descriptions.Item label={'Data de Entrega'}>
                {dateTimeFilter(orderData?.delivery_date!)}
              </Descriptions.Item>
              <Descriptions.Item label={'Valor Total'}>
                {currencyFilter(orderData?.amount_price!)}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions title={'Produtos'}>
            </Descriptions>
            <Table
              dataSource={
                orderDetails?.map(({ attributes }, index) => ({
                  key: index,
                  name: attributes?.name,
                  quantity: attributes?.quantity,
                  price: currencyFilter(attributes?.price!)
                }))
              }
              columns={columns}
              showHeader={false}
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
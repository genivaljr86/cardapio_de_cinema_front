import { useNavigate, useParams } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage"
import { useEffect, useState } from "react";
import { OrderResponseDataObject, getOrderByID } from "../../services/order";
import { Descriptions, Skeleton } from "antd";
import currencyFilter from "../../utils/currencyFilter";

const OrderViewPage: React.FC = () => {

  const { id } = useParams();
  const [orderData, setOrderData] = useState({} as OrderResponseDataObject);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const { data: { data: dataResponse } } = await getOrderByID(id!);
        setOrderData(dataResponse)
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
          <Skeleton active />
        )
          :
          (
            <>
              <Descriptions title={'Dados do Cliente'}>
                <Descriptions.Item label={'Nome'}>{orderData.attributes?.name}</Descriptions.Item>
                <Descriptions.Item label={'Endereço de Entrega'}>{orderData.attributes?.address}</Descriptions.Item>
                <Descriptions.Item label={'Telefone'}>{orderData.attributes?.phone}</Descriptions.Item>
                <Descriptions.Item label={'Data de Entrega'}>{orderData.attributes?.delivery_date}</Descriptions.Item>
              </Descriptions>
              <Descriptions title={'Produtos'}>
                <Descriptions.Item label={'Valor Total'}>{currencyFilter(orderData.attributes?.amount_price!)}</Descriptions.Item>
              </Descriptions>
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
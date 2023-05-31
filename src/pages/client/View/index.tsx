import { useEffect } from "react";
import { Link, RouteObject, } from "react-router-dom";
import useClientViewPageHooks from "./hooks";
import { getClientByID } from "../../../services/client";
import { AxiosError } from "axios";
import { OrderResponseDataObject, getOrders } from "../../../services/order";
import currencyFilter from "../../../utils/currencyFilter";
import dateTimeFilter from "../../../utils/dateTimeFilter";
import CTemplatePage from "../../../components/CTemplatePage"
import ClientEditModal from "../../../components/modals/ClientEditModal";
import { ColumnsType } from "antd/es/table";
import { Descriptions, Skeleton, Table } from "antd";

const columns: ColumnsType<any> = [
  {
    title: 'ID',
    dataIndex: 'orderId'

  },
  {
    title: 'Cliente (Destinário)',
    dataIndex: 'name'
  },
  {
    title: 'Valor',
    dataIndex: 'amount_price'
  },
  {
    title: 'Data de Entrega',
    dataIndex: 'delivery_date'
  }
]

const ClientViewPage: React.FC = () => {

  const {
    id,
    clientDataAttributes, setclientDataAttributes,
    ordersList, setOrdersList,
    ordersLoading, setOrdersLoading,
    loading, setLoading,
    error, setError
  } = useClientViewPageHooks()


  const fetchClientData = async () => {
    try {
      const { data: { attributes } } = await getClientByID(id!);
      setclientDataAttributes(attributes)
    } catch (err) {
      setError(err as AxiosError)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchClientData();
    // eslint-disable-next-line
  }, [])

  const fetchOrdersData = async () => {
    setOrdersLoading(true)
    try {
      const params = {
        'filters[client]': id,
        'populate[1]': 'client',
      }
      const { data: { data: dataResponse, meta: { pagination } } } = await getOrders(params);
      const ordersListHandled = dataResponse.map((row: OrderResponseDataObject) => {
        const {
          id,
          attributes: { name, address, amount_price, delivery_date, custom_delivery,
            client: {
              data: {
                attributes: {
                  name: clientName
                }
              }
            }
          }
        } = row;
        return {
          key: id,
          orderId: <Link to={`../../orders/view/${id}`}>{`#${id}`}</Link>,
          name: clientName + (custom_delivery ? ` (${name})` : ``),
          address,
          amount_price: currencyFilter(amount_price!),
          delivery_date: dateTimeFilter(delivery_date),
          // actions: <Button type="link" onClick={() => showDeleteConfirm(id!)}>Apagar</Button>
        }
      })
      setOrdersList(ordersListHandled)

    } catch (error) {
      console.log('error', error);
    }
    setOrdersLoading(false)
  }
  useEffect(() => {
    fetchOrdersData();
    // eslint-disable-next-line
  }, [])



  return <>
    <CTemplatePage error={error}>
      {
        loading ? (
          <Skeleton active />
        )
          : (
            <>
              <Descriptions
                title={
                  <>
                    Dados do Cliente
                    <ClientEditModal id={id!} onSuccess={fetchClientData} clientData={clientDataAttributes} />
                  </>
                }
              >
                <Descriptions.Item label={'Nome'}>{clientDataAttributes?.name}</Descriptions.Item>
                <Descriptions.Item label={'Endereço'}>{clientDataAttributes?.address}</Descriptions.Item>
                <Descriptions.Item label={'Telefone'}>{clientDataAttributes?.phone}</Descriptions.Item>
              </Descriptions>
              <Descriptions title={'Vendas'}>
              </Descriptions>
              <Table
                loading={ordersLoading}
                dataSource={ordersList}
                columns={columns}
              />
            </>
          )
      }
    </CTemplatePage>
  </>
}

export const ClientViewPageRoute: RouteObject = {
  path: 'view/:id',
  element: <ClientViewPage />,
  handle: {
    label: 'Detalhes'
  }
};

export default ClientViewPage
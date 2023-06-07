import { useEffect } from "react";
import { Order, postOrders } from "../../../services/order";
import { ClientResponseDataObject, getClients } from "../../../services/client";
import { ProductListResponseDataItem, getProducts } from "../../../services/product";
import { OrderDetail, postBulkOrderDetails } from "../../../services/orderDetail";
import styled from "styled-components";
import useOrderCreatePageHooks from "./hooks";
import { Button, Card, Col, DatePicker, Empty, Form, Input, InputNumber, List, Row, Space, Switch } from "antd";
import Title from "antd/es/typography/Title";
import { EditOutlined, ExclamationCircleFilled, } from "@ant-design/icons";
import currencyFilter from "../../../utils/currencyFilter";
import { dateRequestFilter } from "../../../utils/dateTimeFilter";
import CTemplatePage from "../../../components/CTemplatePage"
import CCartTable from "../../../components/tables/CCartTable";
import CSelectProduct from "../../../components/inputs/CSelectProduct";
import CSelectClient from "../../../components/inputs/CSelectClient";

const CustomFormItem = styled(Form.Item)`
  margin-top: 10px;
  margin-bottom: 5px;
`

const FormSectionTitle = styled(Title)`
  margin-top: 10px;
  margin-bottom: 5px;
`

const OrderCreatePage: React.FC = () => {
  const {
    form,
    clientsList, setClientsList,
    clientsLoading, setClientsLoading,
    productsList, setProductsList,
    productsLoading, setProductsLoading,
    orderDetails, setOrderDetails,
    customDelivery, setCustomDelivery,
    clientOriginal, setClientOriginal,
    subTotal, setSubtotal,
    deliveryTax,
    navigate,
    notification,
    Modal
  } = useOrderCreatePageHooks()

  async function fetchClientsData() {
    setClientsLoading(true);
    try {
      const { data: { data: dataResponse } } = await getClients();
      setClientsList(dataResponse);
    } catch (err) {
      throw err;
    }
    setClientsLoading(false);
  }

  async function fetchProductsData() {
    setProductsLoading(true);
    try {
      const params = {
        'populate[0]': 'photo'
      }
      const { data: { data: dataResponse } } = await getProducts(params);
      setProductsList(dataResponse);
    } catch (err) {
      throw err;
    }
    setProductsLoading(false);
  }

  useEffect(() => {
    fetchClientsData();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchProductsData();
    // eslint-disable-next-line
  }, [])

  const onChangeClient = (client: ClientResponseDataObject) => {
    const { id, attributes: { name, address, phone } } = client
    form.setFieldsValue({ client: id, name, address, phone })
    setClientOriginal(client);
  }

  const handleChangeCustomDelivery = (value: boolean) => {
    setCustomDelivery(value);
    if (!value) {
      onChangeClient(clientOriginal!);
    }
  }

  const onSelectProduct = (product: ProductListResponseDataItem) => {
    const { id, attributes: productAtts } = product
    const orderDetail: OrderDetail = {
      product_id: id,
      quantity: 1,
      amount_price: productAtts.price,
      ...productAtts
    };
    setOrderDetails([
      ...orderDetails,
      orderDetail
    ])
  }

  const handleChangeQuantity = (quantity: any, index: number) => {
    if (quantity === 0) {
      Modal.confirm({
        title: 'Tem certeza que desejar apagar este item?',
        icon: <ExclamationCircleFilled />,
        content: orderDetails[index].name,
        onOk() {
          setOrderDetails(orderDetails.filter((o, idx) => idx !== index))
        },
      });
      quantity = 1;
    }
    setOrderDetails(orderDetails.map((orderDetail, idx) => {
      if (index === idx) {
        return {
          ...orderDetail,
          quantity,
          amount_price: orderDetail.price * quantity
        }
      }
      else {
        return orderDetail
      }
    }))
  }

  useEffect(() => {
    /**
     * @todo Sum taxes
     */
    const subTotalHandled = orderDetails.reduce((acc, orderDetails) => acc + orderDetails.amount_price, 0);
    form.setFieldValue('amount_price', subTotalHandled)
    setSubtotal(subTotalHandled);
    // eslint-disable-next-line
  }, [orderDetails])

  const onFinish = async (values: Order) => {
    const orderHandled = {
      ...values,
      delivery_date: dateRequestFilter(values.delivery_date)
    }

    try {
      const { data: { id: order_id } } = await postOrders(orderHandled);
      const orderDetailsHandled = orderDetails.map(orderDetail => (
        {
          order_id,
          ...orderDetail
        }
      ))

      await postBulkOrderDetails(orderDetailsHandled);
      notification.success({
        message: 'Sucesso!',
        description: `A venda de ${values.name} foi criada!`
      })
      navigate(`../view/${order_id}`);
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel criar agora, tente mais tarde'
      })
      throw err;
    }
  }

  return (
    <CTemplatePage>
      <Form
        layout="vertical"
        autoComplete="off"
        form={form}
        requiredMark={true}
        onFinish={onFinish} >
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Cliente">
              <Form.Item name="client"
                rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
                <CSelectClient
                  clients={clientsList}
                  onChangeClient={onChangeClient}
                  loading={clientsLoading} />
              </Form.Item>
              {
                clientOriginal ? (
                  <>
                    <Row>
                      <Col span={21}>
                        <FormSectionTitle level={5}>Dados de Entrega</FormSectionTitle>
                      </Col>
                      <Col span={3}>
                        <CustomFormItem name="custom_delivery" valuePropName="checked" initialValue={false}>
                          <Switch
                            title="Editar Dados de Entrega"
                            checkedChildren={<EditOutlined />}
                            onChange={handleChangeCustomDelivery} />
                        </CustomFormItem>
                      </Col>
                    </Row>
                    <Form.Item name="name" label="Nome"
                      rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
                      <Input placeholder="Insira o nome completo"
                        disabled={!customDelivery} />
                    </Form.Item>
                    <Form.Item name="phone" label="Telefone"
                      rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
                      <Input placeholder="Insira o telefone de contato"
                        disabled={!customDelivery} />
                    </Form.Item>
                    <Form.Item name="address" label="Endereço de Entrega"
                      rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
                      <Input placeholder="Insira o endereço completo"
                        disabled={!customDelivery} />
                    </Form.Item>
                    <Form.Item name="delivery_date" label="Data de Entrega">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item name="amount_price" hidden>
                      <InputNumber bordered={false} />
                    </Form.Item>
                  </>
                ) : (
                  <Empty description="Escolha um cliente" />
                )
              }

            </Card>
          </Col>
          <Col span={16}>
            <Card title="Carrinho">
              <CCartTable orderDetails={orderDetails} handleChangeQuantity={handleChangeQuantity} />
              <Row gutter={16}>
                <Col span={16}>
                  <CSelectProduct
                    products={productsList}
                    onSelectProduct={onSelectProduct}
                    loading={productsLoading}
                  />
                </Col>
                {
                  orderDetails.length > 0 && (
                    <Col span={8}>
                      <List itemLayout="horizontal" style={{ paddingRight: '16px' }}>
                        <List.Item>
                          <List.Item.Meta title={'Valor Total'} />
                          <div>{currencyFilter(subTotal)}</div>
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta title={'Taxa de Entrega'} />
                          <div>{currencyFilter(deliveryTax)}</div>
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta title={'Valor Final'} />
                          <div>{currencyFilter(deliveryTax + subTotal)}</div>
                        </List.Item>
                      </List>
                    </Col>
                  )
                }
              </Row>
            </Card>
          </Col>
        </Row>
        <Form.Item>
          <Space size="small">
            <Button type="primary" htmlType="submit" disabled={orderDetails.length === 0}>Salvar</Button>
          </Space>
        </Form.Item>
      </Form>
    </CTemplatePage>
  )
}
export const OrderCreatePageRoute = {
  path: 'new',
  element: <OrderCreatePage />,
  handle: {
    label: 'Novo'
  }
}

export default OrderCreatePage;
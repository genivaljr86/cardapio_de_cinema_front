import { useEffect } from "react";
import { Order, postOrders } from "../../../services/order";
import { Client, ClientResponseDataObject, getClients } from "../../../services/client";
import { Product, ProductResponseDataObject, getProducts } from "../../../services/product";
import { OrderDetail, postBulkOrderDetails } from "../../../services/orderDetail";
import styled from "styled-components";
import useOrderCreatePageHooks from "./hooks";
import { Button, Card, Col, DatePicker, Empty, Form, Input, InputNumber, List, Modal, Row, Select, Space, Switch, notification } from "antd";
import Title from "antd/es/typography/Title";
import { EditOutlined, ExclamationCircleFilled, } from "@ant-design/icons";
import currencyFilter from "../../../utils/currencyFilter";
import { dateRequestFilter } from "../../../utils/dateTimeFilter";
import CTemplatePage from "../../../components/CTemplatePage"
import CCartTable from "../../../components/tables/CCartTable";
import CSelectProduct from "../../../components/inputs/CSelectProduct";

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
    clientListOptions, setClientListOptions,
    clientsLoading, setClientsLoading,
    productsList, setProductsList,
    productListOptions, setProductListOptions,
    productsLoading, setProductsLoading,
    orderDetails, setOrderDetails,
    customDelivery, setCustomDelivery,
    clientFilled, setClientFilled,
    subTotal, setSubtotal,
    deliveryTax, setDeliveryTax,
    navigate
  } = useOrderCreatePageHooks()

  async function fetchClientsData() {
    setClientsLoading(true);
    try {
      const clientListHandle: Client[] = [];
      const { data: { data: dataResponse } } = await getClients();
      const clientListOptionsHandle = dataResponse.map((row: ClientResponseDataObject) => {
        const { id, attributes: { name, address, phone } } = row;
        /**
         * @todo Remove this conditional for reasons of TS
         */
        if (id) {
          clientListHandle[id] = { name, address, phone };
        }
        return {
          value: id,
          label: name
        }
      });
      setClientsList(clientListHandle);
      setClientListOptions(clientListOptionsHandle);
    } catch (err) {
      throw err;
    }
    setClientsLoading(false);
  }

  async function fetchProductsData() {
    setProductsLoading(true);
    try {
      const productListHandle: Product[] = [];
      const { data: { data: dataResponse } } = await getProducts();
      const orderListOptionsHandle = dataResponse.map((row: ProductResponseDataObject) => {
        const { id, attributes: { name, price } } = row;
        /**
         * @todo Remove this conditional for reasons of TS
         */
        if (id) {
          productListHandle[id] = { name, price };
        }
        return {
          value: id,
          label: name
        }
      });

      setProductsList(productListHandle);
      setProductListOptions(orderListOptionsHandle);
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

  const handleChangeClient = (id: any) => {
    setClientFilled(true);
    form.setFieldValue('name', clientsList[id].name)
    form.setFieldValue('address', clientsList[id].address)
    form.setFieldValue('phone', clientsList[id].phone)
  }

  const handleChangeCustomDelivery = (value: boolean) => {
    setCustomDelivery(value);
    if (!value) {
      handleChangeClient(form.getFieldValue('client'));
    }
  }

  const handleChangeProduct = (id: any) => {
    const orderDetail: OrderDetail = {
      product_id: id,
      quantity: 1,
      amount_price: productsList[id].price,
      ...productsList[id]
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
                <Select
                  showSearch
                  placeholder="Escolha um cliente"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  loading={clientsLoading}
                  options={clientListOptions}
                  onChange={handleChangeClient} />
              </Form.Item>
              {
                clientFilled ? (
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
                    productListOptions={productListOptions}
                    handleChangeProduct={handleChangeProduct}
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
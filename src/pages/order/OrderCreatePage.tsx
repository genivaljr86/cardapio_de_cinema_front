import { useNavigate } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage"
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Switch, Table, Tooltip, notification } from "antd";
import { Order, postOrders } from "../../services/order";
import { useEffect, useState } from "react";
import { Client, ClientResponseDataObject, getClients } from "../../services/client";
import { dateRequestFilter } from "../../utils/dateTimeFilter";
import { OptionProps } from "antd/es/select";
import { Product, ProductResponseDataObject, getProducts } from "../../services/product";
import { OrderDetail, postBulkOrderDetails } from "../../services/orderDetail";
import currencyFilter from "../../utils/currencyFilter";
import { ColumnsType } from "antd/es/table";
import { EditFilled, EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const CustomFormItem = styled(Form.Item)`
  margin-bottom: 0;
`


const columns: ColumnsType<any> = [
  {
    title: 'Nome',
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

const OrderCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [clientsList, setClientsList] = useState<Client[]>([])
  const [clientListOptions, setClientListOptions] = useState<OptionProps[]>([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [productsList, setProductsList] = useState<Product[]>([])
  const [productListOptions, setProductListOptions] = useState<OptionProps[]>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([])
  const [customDelivery, setCustomDelivery] = useState(false)
  const [clientFilled, setClientFilled] = useState(false)
  const navigate = useNavigate()

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
  }, [])

  useEffect(() => {
    fetchProductsData();
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
      ...productsList[id]
    };
    setOrderDetails([
      ...orderDetails,
      orderDetail
    ])
  }

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
              <Form.Item name="client" label="Cliente"
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

            </Card>
          </Col>{
            clientFilled && (
              <>
                <Col span={8} hidden={true}>
                  <Card title="Entrega"
                    extra={
                      <>
                        <CustomFormItem name="custom_delivery" valuePropName="checked" initialValue={false}>
                          <Switch
                            checkedChildren={<EditOutlined />}
                            onChange={handleChangeCustomDelivery} />
                        </CustomFormItem>
                      </>
                    }
                  >
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
                    <Form.Item hidden name="amount_price" label="Valor Total" initialValue={22.40}>
                      <InputNumber readOnly bordered={false} prefix="R$" />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Carrinho"
                    extra={
                      <Select
                        showSearch
                        placeholder="Adicione um produto"
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        loading={productsLoading}
                        options={productListOptions}
                        onChange={handleChangeProduct}
                      />}
                  >
                    <Table
                      dataSource={
                        orderDetails.map((order, index) => ({
                          key: index,
                          name: order?.name,
                          quantity: order?.quantity,
                          price: currencyFilter(order?.price)
                        }))
                      }
                      columns={columns}
                    />
                  </Card>
                </Col>
              </>
            )
          }
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
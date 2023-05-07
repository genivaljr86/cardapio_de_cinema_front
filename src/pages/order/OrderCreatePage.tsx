import { useNavigate } from "react-router-dom";
import CTemplatePage from "../../components/CTemplatePage"
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, SelectProps, Space, notification } from "antd";
import { Order, postOrders } from "../../services/order";
import { useEffect, useState } from "react";
import { Client, ClientResponseDataObject, getClients } from "../../services/client";
import locale from "antd/es/date-picker/locale/pt_BR";
import dayjs from "dayjs";
import { dateRequestFilter } from "../../utils/dateTimeFilter";

const OrderCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const [clientsList, setClientsList] = useState<Client[]>([])
  const [clientListOptions, setClientListOptions] = useState([])
  const [productsList, setProductsList] = useState([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [productsLoading, setProductsLoading] = useState(false)
  const navigate = useNavigate();

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

  const handleChangeClient = (id: any) => {
    form.setFieldValue('name', clientsList[id].name)
    form.setFieldValue('address', clientsList[id].address)
    form.setFieldValue('phone', clientsList[id].phone)
  }

  useEffect(() => {
    fetchClientsData();
  }, [])

  const onFinish = async (values: Order) => {
    console.log("values", values);
    console.log('data', dateRequestFilter(values.delivery_date));

    const valuesHandled = {
      ...values,
      delivery_date: dateRequestFilter(values.delivery_date)
    }
    try {
      const { data: { data: { id } } } = await postOrders(valuesHandled);
      notification.success({
        message: 'Sucesso!',
        description: `A venda de ${values.name} foi criada!`
      })
      // navigate(`../view/${id}`);
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel criar agora, tente mais tarde'
      })
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
          <Col span={12}>
            <Form.Item name="client" label="Cliente"
              rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
              <Select
                loading={clientsLoading}
                options={clientListOptions}
                onChange={handleChangeClient} />
            </Form.Item>
            <Form.Item name="name" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Telefone">
              <Input placeholder="Insira o telefone de contato" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Endereço de Entrega"
              rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
              <Input placeholder="Insira o endereço completo" />
            </Form.Item>
            <Form.Item name="delivery_date" label="Data de Entrega">
              <DatePicker />
            </Form.Item>
            <Form.Item name="amount_price" label="Valor Total" initialValue={22.40}>
              <InputNumber readOnly bordered={false} prefix="R$" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item >
          <Space size="small">
            <Button type="primary" htmlType="submit">Salvar</Button>
            {/* <Button htmlType="button" type="link" onClick={onReset}>
            Limpar
          </Button> */}
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
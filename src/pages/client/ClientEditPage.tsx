import { Button, Form, Input, Skeleton, Space, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import { Client, getClientByID, putClient } from "../../services/client";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClientEditPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchData() {
    setLoading(true);
    try {
      const { data: { data: { attributes: { name, address } } } } = await getClientByID(id!);
      form.setFieldsValue({ name, address })
    } catch (err) {
      throw err;
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [])

  const onFinish = async (values: Client) => {
    try {
      await putClient(id!, values);
      notification.success({
        message: 'Sucesso!',
        description: `Cliente ${values.name} foi editado!`
      })
      navigate(`../view/${id}`);
    } catch (err) {
      notification.error({
        message: 'Erro!',
        description: 'Não foi possivel criar agora, tente mais tarde'
      })
    }
  }

  const onReset = () => {
    form.resetFields();
  };

  return (<>
    <CTemplatePage>
      {
        loading ? (
          <Skeleton />
        ) : (
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            requiredMark={true}
            onFinish={onFinish}
            style={{ maxWidth: 600 }} >
            <Form.Item name="name" label="Nome"
              rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
              <Input placeholder="Insira o nome completo" />
            </Form.Item>
            <Form.Item name="address" label="Endereço"
              rules={[{ required: true, message: 'Esse campo é obrigatório' }]}>
              <Input placeholder="Insira o endereço completo" />
            </Form.Item>
            <Form.Item >
              <Space size="small">
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button htmlType="button" type="link" onClick={onReset}>
                  Limpar
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )
      }
    </CTemplatePage>
  </>);
}

export const ClientEditPageRoute = {
  path: 'edit/:id',
  element: <ClientEditPage />,
  handle: {
    label: 'Editar'
  }
}
export default ClientEditPage;
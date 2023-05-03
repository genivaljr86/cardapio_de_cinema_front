import { Button, Form, Input, Space, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import { Client, postClients } from "../../services/client";
import { useNavigate } from "react-router-dom";

const ClientCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: Client) => {

    try {
      const { data: { data: { id } } } = await postClients(values);
      notification.success({
        message: 'Sucesso!',
        description: `Cliente ${values.name} foi criado!`
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
            <Button type="primary" htmlType="submit">Criar Cliente</Button>
            <Button htmlType="button" type="link" onClick={onReset}>
              Limpar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CTemplatePage>
  </>);
}

export const ClientCreatePageRoute = {
  path: 'new',
  element: <ClientCreatePage />,
  handle: {
    label: 'Novo'
  }
}
export default ClientCreatePage;
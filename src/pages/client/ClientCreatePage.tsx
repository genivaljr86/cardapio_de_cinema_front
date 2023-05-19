import { Form, notification } from "antd";
import CTemplatePage from "../../components/CTemplatePage";
import { Client, postClients } from "../../services/client";
import { useNavigate } from "react-router-dom";
import ClientForm from "../../components/forms/ClientForm";

const ClientCreatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: Client) => {
    try {
      const { data: { id } } = await postClients(values);
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

  return (<>
    <CTemplatePage>
      <ClientForm form={form} onFinish={onFinish} />
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